import { useState } from 'react'

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  paymentMethod: 'card',
  cardHolder: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  comment: '',
}

export function CheckoutSection({
  cart,
  cartItems,
  cartTotal,
  onClearCart,
  formatPrice,
  onBrowseCatalog,
}) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [cartError, setCartError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submittedOrder, setSubmittedOrder] = useState(null)

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    let formattedValue = type === 'checkbox' ? checked : value

    if (name === 'cardNumber') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 16)
      formattedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ')
    } else if (name === 'expiryDate') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 4)
      if (digitsOnly.length >= 3) {
        formattedValue = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`
      } else {
        formattedValue = digitsOnly
      }
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    // Clear field-level error when user modifies the field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }

    // If switching to cash, clear card-related errors
    if (name === 'paymentMethod' && formattedValue === 'cash') {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.cardHolder
        delete next.cardNumber
        delete next.expiryDate
        delete next.cvv
        return next
      })
    }

    if (cartError) {
      setCartError('')
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name.'
    }

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // phone
    const phoneDigits = formData.phone.replace(/\D/g, '')
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (!phoneRegex.test(formData.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (7–15 digits).'
    }

    // address
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required.'
    }

    // city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.'
    }

    // paymentMethod
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.'
    }

    // Payment fields when bank card payment is selected
    if (formData.paymentMethod === 'card') {
      if (!formData.cardHolder.trim()) {
        newErrors.cardHolder = 'Cardholder name is required.'
      } else if (!/^[a-zA-Z\s'-]+$/.test(formData.cardHolder.trim())) {
        newErrors.cardHolder = 'Cardholder name must contain only letters.'
      }

      const rawCard = formData.cardNumber.replace(/\s+/g, '')
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Bank card number is required.'
      } else if (!/^\d{16}$/.test(rawCard)) {
        newErrors.cardNumber = 'Card number must be 16 digits.'
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiration date is required.'
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate.trim())) {
        newErrors.expiryDate = 'Expiration date must be in MM/YY format.'
      } else {
        const [month, year] = formData.expiryDate.trim().split('/').map(Number)
        const currentYear = new Date().getFullYear() % 100
        const currentMonth = new Date().getMonth() + 1
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = 'Card has expired.'
        }
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = 'Security code (CVV) is required.'
      } else if (!/^\d{3,4}$/.test(formData.cvv.trim())) {
        newErrors.cvv = 'CVV must be 3 or 4 digits.'
      }
    }

    return newErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Ensure shopping cart contains products
    if (!cartItems || cartItems.length === 0) {
      setCartError('Your shopping cart is empty. Please add items to your cart before placing an order.')
      return
    }
    setCartError('')

    // Validate the entered data
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    // Record order information before clearing form and cart
    const orderRecord = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod === 'card' ? 'Bank card' : 'Cash on delivery',
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand || 'Independent',
        image: item.image,
        price: item.price,
        quantity: cart[item.id] || 1,
        subtotal: item.price * (cart[item.id] || 1),
      })),
      totalAmount: cartTotal,
      comment: formData.comment.trim(),
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    // Update state: store submitted order and show success message
    setSubmittedOrder(orderRecord)
    setSuccessMessage('Order successfully placed!')

    // Clear the form and shopping cart
    setFormData(initialFormData)
    onClearCart()

    // Smoothly scroll to the "Your Order" confirmation section
    setTimeout(() => {
      document.getElementById('your-order')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleResetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setCartError('')
  }

  const handleClearCart = () => {
    onClearCart()
    setCartError('')
  }

  return (
    <section className="checkout-section" id="checkout" aria-labelledby="checkout-title">
      <div className="checkout-header">
        <div>
          <span className="section-kicker">Order Checkout</span>
          <h2 id="checkout-title">Customer Checkout</h2>
        </div>
        <p>Complete your delivery and payment details to place your order.</p>
      </div>

      {/* Success message: displayed ONLY after the form has been validated and submitted successfully */}
      {successMessage && (
        <div className="checkout-success-banner" role="status">
          <div className="success-badge-icon">✓</div>
          <div className="success-badge-text">
            <strong>{successMessage}</strong>
            <p>Thank you! Your order details are confirmed below in the "Your Order" section.</p>
          </div>
        </div>
      )}

      {/* Order Information section: titled "Your Order", appears ONLY after successful submission */}
      {submittedOrder && (
        <section className="your-order-section" id="your-order" aria-labelledby="your-order-title">
          <div className="your-order-header">
            <div>
              <span className="section-kicker">Confirmation</span>
              <h2 id="your-order-title">Your Order</h2>
            </div>
            <span className="your-order-badge">Placed at {submittedOrder.orderTime}</span>
          </div>

          <div className="your-order-grid">
            <div className="your-order-card customer-details">
              <h3>Customer Information</h3>
              <p><strong>Customer's full name:</strong> <span>{submittedOrder.fullName}</span></p>
              <p><strong>Email address:</strong> <span>{submittedOrder.email}</span></p>
              <p><strong>Phone number:</strong> <span>{submittedOrder.phone}</span></p>
            </div>

            <div className="your-order-card delivery-details">
              <h3>Delivery & Payment</h3>
              <p><strong>Delivery address:</strong> <span>{submittedOrder.address}, {submittedOrder.city}</span></p>
              <p><strong>Selected payment method:</strong> <span>{submittedOrder.paymentMethod}</span></p>
              {submittedOrder.comment && (
                <p><strong>Order comments:</strong> <span>{submittedOrder.comment}</span></p>
              )}
            </div>
          </div>

          <div className="your-order-products">
            <h3>List of selected products</h3>
            <div className="your-order-items-list">
              {submittedOrder.items.map((item) => (
                <div className="your-order-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="your-order-item-thumb" />
                  <div className="your-order-item-info">
                    <span className="your-order-item-brand">{item.brand}</span>
                    <h4 className="your-order-item-name">{item.name}</h4>
                    <span className="your-order-item-qty">Qty: {item.quantity} × {formatPrice(item.price)}</span>
                  </div>
                  <strong className="your-order-item-subtotal">{formatPrice(item.subtotal)}</strong>
                </div>
              ))}
            </div>
            <div className="your-order-total-row">
              <span>Total order amount</span>
              <strong>{formatPrice(submittedOrder.totalAmount)}</strong>
            </div>
          </div>
        </section>
      )}

      {/* Checkout Form & Cart Overview Layout */}
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          {/* General Cart Error */}
          {cartError && (
            <div className="form-alert-error" role="alert">
              <span className="alert-icon">!</span>
              <span>{cartError}</span>
            </div>
          )}

          {/* Section: Customer Details */}
          <fieldset className="checkout-fieldset">
            <legend className="fieldset-legend">1. Customer Information</legend>

            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Roman Vance"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'has-error' : ''}
              />
              {/* Error messages are displayed only when errors exist */}
              {errors.fullName && <span className="field-error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="roman@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'has-error' : ''}
                />
                {errors.email && <span className="field-error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="req">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 (701) 555-0199"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'has-error' : ''}
                />
                {errors.phone && <span className="field-error-message">{errors.phone}</span>}
              </div>
            </div>
          </fieldset>

          {/* Section: Delivery Address */}
          <fieldset className="checkout-fieldset">
            <legend className="fieldset-legend">2. Delivery Address</legend>

            <div className="form-group-row address-row">
              <div className="form-group flex-2">
                <label htmlFor="address">
                  Delivery Address <span className="req">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Dostyk Ave 42, Apt 15"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'has-error' : ''}
                />
                {errors.address && <span className="field-error-message">{errors.address}</span>}
              </div>

              <div className="form-group flex-1">
                <label htmlFor="city">
                  City <span className="req">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Almaty"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'has-error' : ''}
                />
                {errors.city && <span className="field-error-message">{errors.city}</span>}
              </div>
            </div>
          </fieldset>

          {/* Section: Payment Method */}
          <fieldset className="checkout-fieldset">
            <legend className="fieldset-legend">3. Payment Method</legend>

            <div className="payment-method-selector">
              <label className={`payment-radio-label ${formData.paymentMethod === 'card' ? 'is-selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                />
                <span className="payment-radio-title">Bank card</span>
                <span className="payment-radio-desc">Pay securely with Visa, Mastercard or Mir</span>
              </label>

              <label className={`payment-radio-label ${formData.paymentMethod === 'cash' ? 'is-selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                />
                <span className="payment-radio-title">Cash on delivery</span>
                <span className="payment-radio-desc">Pay cash or local QR upon package delivery</span>
              </label>
            </div>
            {errors.paymentMethod && <span className="field-error-message">{errors.paymentMethod}</span>}

            {/* Bank card fields: displayed ONLY when bank card payment is selected */}
            {formData.paymentMethod === 'card' && (
              <div className="card-fields-wrapper">
                <div className="form-group">
                  <label htmlFor="cardHolder">
                    Cardholder's Name <span className="req">*</span>
                  </label>
                  <input
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    placeholder="ROMAN VANCE"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    className={errors.cardHolder ? 'has-error' : ''}
                  />
                  {errors.cardHolder && <span className="field-error-message">{errors.cardHolder}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">
                    Bank Card Number <span className="req">*</span>
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    maxLength={19}
                    placeholder="4400 1234 5678 9012"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={errors.cardNumber ? 'has-error' : ''}
                  />
                  {errors.cardNumber && <span className="field-error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">
                      Card Expiration Date <span className="req">*</span>
                    </label>
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={errors.expiryDate ? 'has-error' : ''}
                    />
                    {errors.expiryDate && <span className="field-error-message">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">
                      Security Code (CVV) <span className="req">*</span>
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={errors.cvv ? 'has-error' : ''}
                    />
                    {errors.cvv && <span className="field-error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}
          </fieldset>

          {/* Section: Comments */}
          <fieldset className="checkout-fieldset">
            <legend className="fieldset-legend">4. Order Comments</legend>
            <div className="form-group">
              <label htmlFor="comment">
                Order Comments <span className="opt">(optional)</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                placeholder="Door code, delivery time preference or special instructions..."
                value={formData.comment}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>

          {/* Form Control Buttons:
              - "Place Order" — submits the form after validation;
              - "Reset Form" — clears all entered data;
              - "Clear Cart" — removes all products from the shopping cart.
          */}
          <div className="checkout-form-actions">
            <button className="btn-place-order" type="submit">
              Place Order
            </button>
            <button className="btn-reset-form" onClick={handleResetForm} type="button">
              Reset Form
            </button>
            <button className="btn-clear-cart" onClick={handleClearCart} type="button">
              Clear Cart
            </button>
          </div>
        </form>

        {/* Selected Products Sidebar */}
        <aside className="checkout-summary-sidebar" aria-label="Cart Overview">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <h3>Cart Overview</h3>
              <span className="items-count-badge">
                {cartItems ? cartItems.reduce((sum, item) => sum + (cart[item.id] || 0), 0) : 0} items
              </span>
            </div>

            {cartItems && cartItems.length > 0 ? (
              <>
                <div className="sidebar-items-list">
                  {cartItems.map((product) => (
                    <div className="sidebar-product-row" key={product.id}>
                      <img src={product.image} alt={product.name} className="sidebar-product-img" />
                      <div className="sidebar-product-meta">
                        <span className="sidebar-product-brand">{product.brand || 'Independent'}</span>
                        <h4 className="sidebar-product-title">{product.name}</h4>
                        <span className="sidebar-product-unit">
                          {cart[product.id]} × {formatPrice(product.price)}
                        </span>
                      </div>
                      <span className="sidebar-product-subtotal">
                        {formatPrice(product.price * cart[product.id])}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="sidebar-totals">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Delivery</span>
                    <span className="free-delivery">Free</span>
                  </div>
                  <div className="summary-line total-line">
                    <span>Total Amount</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="sidebar-empty-cart">
                <p>Your bag is currently empty.</p>
                <button
                  className="btn-browse-catalog"
                  onClick={onBrowseCatalog}
                  type="button"
                >
                  Browse catalog ↑
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
