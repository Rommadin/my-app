import { useEffect, useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    brand: 'Nike',
    name: 'Air Max 90',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'Infrared / white',
    price: 68900,
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    brand: 'adidas',
    name: 'Samba OG',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'Cloud white / core black',
    price: 54900,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    brand: 'Reebok',
    name: 'Club C 85',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'Chalk / green',
    price: 49900,
    badge: '',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 4,
    brand: 'Nike',
    name: 'Manoa Leather',
    category: 'Boots',
    type: 'boots',
    color: 'Black / black',
    price: 79900,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    brand: 'adidas',
    name: 'Gazelle Indoor',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'Preloved red / cream',
    price: 57900,
    badge: '',
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 6,
    brand: 'Nike',
    name: 'Dunk Low',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'White / university blue',
    price: 62900,
    badge: '',
    image:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7,
    brand: 'ASICS',
    name: 'GT-2160',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'White / pure silver',
    price: 69900,
    badge: 'New',
    description: 'A lightweight running-inspired sneaker with cushioned comfort for everyday wear.',
    image:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 8,
    brand: 'Reebok',
    name: 'Classic Leather',
    category: 'Shoes',
    type: 'shoes',
    color: 'Chalk / black',
    price: 45900,
    badge: '',
    description: 'A clean leather classic with a soft step and timeless low-profile shape.',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 9,
    brand: 'adidas',
    name: 'Superstar',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'White / black',
    price: 52900,
    badge: '',
    description: 'The iconic shell-toe sneaker, made for everyday city style.',
    image:
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 10,
    brand: 'Nike',
    name: "Air Force 1 '07",
    category: 'Sneakers',
    type: 'sneakers',
    color: 'White / white',
    price: 64900,
    badge: 'Bestseller',
    description: 'A court classic with a smooth leather upper and all-day cushioning.',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 11,
    brand: 'Reebok',
    name: 'Classic Nylon',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'Chalk / vector navy',
    price: 47900,
    badge: '',
    description: 'A retro runner in soft suede and nylon with a comfortable padded fit.',
    image:
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 12,
    brand: 'ASICS',
    name: 'GEL-1130',
    category: 'Sneakers',
    type: 'sneakers',
    color: 'Cream / graphite grey',
    price: 64900,
    badge: '',
    description: 'A heritage running silhouette with GEL cushioning for a smooth city stride.',
    image:
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=90',
  },
]

const categories = [
  { id: 'all', label: 'All footwear' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'boots', label: 'Boots' },
  { id: 'shoes', label: 'Shoes' },
]

const formatPrice = (price) => `${price.toLocaleString('en-US')} ₸`

function loadCart() {
  try {
    const storedCart = localStorage.getItem('romans-cart')
    if (!storedCart) return {}

    const parsedCart = JSON.parse(storedCart)
    if (!parsedCart || typeof parsedCart !== 'object' || Array.isArray(parsedCart)) {
      throw new Error('Saved bag has an invalid format.')
    }

    return Object.fromEntries(
      Object.entries(parsedCart).filter(
        ([productId, quantity]) =>
          (products.some((product) => String(product.id) === productId) ||
            /^custom-\d+$/.test(productId)) &&
          Number.isInteger(quantity) &&
          quantity > 0,
      ),
    )
  } catch (error) {
    console.error('Could not restore the saved bag.', error)
    return {}
  }
}

function loadSession() {
  try {
    const storedSession = localStorage.getItem('romans-session')
    if (!storedSession) return null

    const session = JSON.parse(storedSession)
    if (typeof session?.name === 'string' && typeof session?.email === 'string') {
      return { name: session.name, email: session.email }
    }
    throw new Error('The saved account session has an invalid format.')
  } catch (error) {
    console.error('Could not restore the saved account session.', error)
    return null
  }
}

const demoAccount = {
  name: 'Romans Shoe Guest',
  email: 'demo@romans.shoe',
  password: 'romans123',
}

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12M10 4.5 15.5 10 10 15.5" />
    </svg>
  )
}

function ProductCard({ product, index, totalCount, quantity, onAdd, onBuy, onView }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          alt={`${product.brand} ${product.name} in ${product.color}`}
          className="product-image"
          loading="lazy"
          src={product.image}
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="product-index">{String(index + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}</span>
        {quantity > 0 && <span className="in-cart-label">In bag · {quantity}</span>}
      </div>
      <div className="product-info">
        <div>
          <span className="product-category">{product.brand || 'Independent'} · {product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.description || `${product.color}. Made for everyday comfort.`}</p>
        </div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <div className="product-actions">
        <button className="product-details-button" onClick={onView} type="button">
          Details
        </button>
        <button className="product-buy-button" onClick={onAdd} type="button">
          Add to bag
        </button>
        <button className="product-buy-now" onClick={onBuy} type="button">
          Buy now
        </button>
      </div>
    </article>
  )
}

function ProductDetailDialog({ product, onClose, onAdd }) {
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <section
        aria-labelledby="product-detail-title"
        aria-modal="true"
        className="product-detail-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Close product details" className="close-button modal-close" onClick={onClose} type="button">×</button>
        <img alt={`${product.brand} ${product.name}`} src={product.image} />
        <div className="product-detail-copy">
          <span className="section-kicker">{product.brand || 'Independent'} · {product.category} · RS-{String(product.id).padStart(3, '0')}</span>
          <h2 id="product-detail-title">{product.name}</h2>
          <strong>{formatPrice(product.price)}</strong>
          <p>{product.description || `${product.color}. Designed for everyday comfort and effortless styling.`}</p>
          <dl>
            <div><dt>Color</dt><dd>{product.color}</dd></div>
            <div><dt>Materials</dt><dd>{product.type === 'boots' ? 'Leather and durable textile' : 'Leather and breathable textile'}</dd></div>
            <div><dt>Delivery</dt><dd>Free delivery in Almaty · 14-day returns</dd></div>
          </dl>
          <button className="checkout-button" onClick={onAdd} type="button">
            Add to bag <ArrowIcon />
          </button>
        </div>
      </section>
    </div>
  )
}

function CartDrawer({
  cart,
  cartItems,
  cartCount,
  cartTotal,
  checkoutMessage,
  loggedUser,
  onBrowse,
  onCheckout,
  onClose,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div className="cart-overlay" onMouseDown={onClose}>
      <aside
        aria-label="Shopping bag"
        aria-modal="true"
        className="cart-drawer"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="cart-drawer-header">
          <div>
            <span className="section-kicker">Romans Shoe · Almaty</span>
            <h2>Your bag <span>({cartCount})</span></h2>
          </div>
          <button aria-label="Close bag" className="close-button" onClick={onClose} type="button">×</button>
        </div>
        {cartItems.length ? (
          <>
            <div className="cart-items">
              {cartItems.map((product) => (
                <div className="cart-item" key={product.id}>
                  <img alt="" src={product.image} />
                  <div className="cart-item-info">
                    <span>{product.brand || 'Independent'} · {product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                    <div className="quantity-control">
                      <button aria-label={`Decrease quantity of ${product.name}`} onClick={() => onQuantityChange(product.id, -1)} type="button">−</button>
                      <span>{cart[product.id]}</span>
                      <button aria-label={`Increase quantity of ${product.name}`} onClick={() => onQuantityChange(product.id, 1)} type="button">+</button>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${product.name} from bag`}
                    className="remove-cart-item"
                    onClick={() => onRemove(product.id)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div>
              <button className="checkout-button" onClick={onCheckout} type="button">
                {loggedUser ? 'Place demo order' : 'Sign in to checkout'} <ArrowIcon />
              </button>
              {checkoutMessage ? <p className="checkout-message" role="status">{checkoutMessage}</p> : <p>Demo checkout · no payment is collected.</p>}
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <span className="cart-empty-icon">R.</span>
            <h3>Your bag is empty</h3>
            <p>Find your next favorite pair in our curated collection.</p>
            <button className="primary-link" onClick={onBrowse} type="button">
              Explore the collection <ArrowIcon />
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

function AuthDialog({ onClose, onLogin, onRegister, notice }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmation: '' })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const updateForm = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (mode === 'login') {
      const message = onLogin(form.email.trim(), form.password)
      if (message) setSuccess(message)
      else setError('Sign-in failed. Check your email and password.')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (form.password !== form.confirmation) {
      setError('Passwords do not match.')
      return
    }
    if (!acceptedTerms) {
      setError('Please accept the demo site terms.')
      return
    }

    const message = onRegister({ name: form.name.trim(), email: form.email.trim(), password: form.password })
    if (message) setSuccess(message)
    else setError('A demo account already exists for this email. Please sign in.')
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <section
        aria-labelledby="auth-title"
        aria-modal="true"
        className="auth-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Close" className="close-button modal-close" onClick={onClose} type="button">×</button>
        <span className="section-kicker">Romans Shoe · Almaty</span>
        <h2 id="auth-title">{success ? 'You’re all set' : mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
        {success ? (
          <div className="auth-success">
            <p>{success}</p>
            <button className="checkout-button" onClick={onClose} type="button">Continue</button>
          </div>
        ) : (
          <>
            {notice && <p className="auth-notice">{notice}</p>}
            {mode === 'login' && (
              <div className="demo-credentials">
                Demo access: <strong>demo@romans.shoe</strong> / <strong>romans123</strong>
              </div>
            )}
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'register' && (
                <label>
                  Full name
                  <input autoComplete="name" onChange={updateForm('name')} required value={form.name} />
                </label>
              )}
              <label>
                Email
                <input autoComplete="email" onChange={updateForm('email')} required type="email" value={form.email} />
              </label>
              <label>
                Password
                <span className="password-field">
                  <input
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    minLength={mode === 'register' ? 8 : undefined}
                    onChange={updateForm('password')}
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                  />
                  <button onClick={() => setShowPassword((visible) => !visible)} type="button">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </span>
              </label>
              {mode === 'register' && (
                <>
                  <label>
                    Confirm password
                    <input
                      autoComplete="new-password"
                      onChange={updateForm('confirmation')}
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirmation}
                    />
                  </label>
                  <label className="terms-check">
                    <input checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} type="checkbox" />
                    <span>I accept the demo site terms</span>
                  </label>
                </>
              )}
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="checkout-button" type="submit">
                {mode === 'login' ? 'Sign in' : 'Create account'} <ArrowIcon />
              </button>
            </form>
            <p className="auth-switch">
              {mode === 'login' ? 'New to Romans Shoe?' : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                }}
                type="button"
              >
                {mode === 'login' ? 'Create account' : 'Sign in'}
              </button>
            </p>
            <p className="demo-disclaimer">Demo only. Do not use real passwords or payment details.</p>
          </>
        )}
      </section>
    </div>
  )
}

function App() {
  const [category, setCategory] = useState('all')
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [savedProducts, setSavedProducts] = useState(() => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem('romans-products') || '[]')
      return Array.isArray(storedProducts)
        ? storedProducts.map((product) => ({
            ...product,
            brand: product.brand || 'Independent',
            category: categories.find((item) => item.id === product.type)?.label || 'Shoes',
          }))
        : []
    } catch {
      return []
    }
  })
  const [productFormOpen, setProductFormOpen] = useState(false)
  const [productForm, setProductForm] = useState({ brand: '', name: '', category: 'sneakers', color: '', price: '', description: '' })
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('romans-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authNotice, setAuthNotice] = useState('')
  const [loggedUser, setLoggedUser] = useState(loadSession)
  const [registeredAccount, setRegisteredAccount] = useState(null)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const allProducts = useMemo(() => [...products, ...savedProducts], [savedProducts])

  useEffect(() => {
    try {
      localStorage.setItem('romans-products', JSON.stringify(savedProducts))
    } catch {}
  }, [savedProducts])

  useEffect(() => {
    try {
      localStorage.setItem('romans-cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Could not save the shopping bag.', error)
    }
  }, [cart])

  useEffect(() => {
    try {
      if (loggedUser) {
        localStorage.setItem('romans-session', JSON.stringify(loggedUser))
      } else {
        localStorage.removeItem('romans-session')
      }
    } catch (error) {
      console.error('Could not save the account session.', error)
    }
  }, [loggedUser])

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(timeoutId)
  }, [search])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('romans-theme', theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setCartOpen(false)
      setSelectedProduct(null)
      setAuthOpen(false)
      setSearchOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLocaleLowerCase('en-US')
    const matches = allProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.type === category
      const matchesSearch =
        !query ||
        `${product.brand || ''} ${product.name} ${product.category} ${product.color}`
          .toLocaleLowerCase('en-US')
          .includes(query)
      return matchesCategory && matchesSearch
    })
    return matches.sort((first, second) => {
      if (sortBy === 'price-asc') return first.price - second.price
      if (sortBy === 'price-desc') return second.price - first.price
      if (sortBy === 'name-asc') return first.name.localeCompare(second.name, 'en')
      if (sortBy === 'name-desc') return second.name.localeCompare(first.name, 'en')
      return 0
    })
  }, [allProducts, category, debouncedSearch, sortBy])

  const cartItems = allProducts.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const cartTotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0,
  )

  const addToCart = (productId) => {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1,
    }))
  }

  const buyNow = (productId) => {
    setCart((current) => ({ ...current, [productId]: current[productId] || 1 }))
    setCartOpen(true)
  }

  const changeQuantity = (productId, change) => {
    setCart((current) => {
      const nextCount = (current[productId] || 0) + change
      if (nextCount <= 0) {
        const nextCart = { ...current }
        delete nextCart[productId]
        return nextCart
      }
      return { ...current, [productId]: nextCount }
    })
  }

  const removeFromCart = (productId) => {
    setCart((current) => {
      const nextCart = { ...current }
      delete nextCart[productId]
      return nextCart
    })
  }

  const handleLogin = (email, password) => {
    if (email === demoAccount.email && password === demoAccount.password) {
      setLoggedUser({ name: demoAccount.name, email: demoAccount.email })
      return `Signed in as ${demoAccount.name}.`
    }
    if (registeredAccount && email === registeredAccount.email && password === registeredAccount.password) {
      setLoggedUser({ name: registeredAccount.name, email: registeredAccount.email })
      return `Signed in as ${registeredAccount.name}.`
    }
    return ''
  }

  const handleRegister = (account) => {
    if (account.email === demoAccount.email || account.email === registeredAccount?.email) return ''
    setRegisteredAccount(account)
    setLoggedUser({ name: account.name, email: account.email })
    return `Account created for ${account.name}. You are signed in.`
  }

  const handleCheckout = () => {
    if (!loggedUser) {
      setCartOpen(false)
      setAuthNotice('Sign in or create an account to continue to demo checkout.')
      setAuthOpen(true)
      return
    }
    setCheckoutMessage(`Demo order prepared for ${loggedUser.name}. No payment is collected.`)
  }

  const resetCatalog = () => {
    setCategory('all')
    setSearch('')
    setSortBy('featured')
  }

  const handleAddProduct = (event) => {
    event.preventDefault()
    const newProduct = {
      id: `custom-${Date.now()}`,
      name: productForm.name.trim(),
      brand: productForm.brand.trim() || 'Independent',
      category: categories.find((item) => item.id === productForm.category).label,
      type: productForm.category,
      color: productForm.color.trim(),
      price: Number(productForm.price),
      badge: 'New arrival',
      description: productForm.description.trim(),
      image: products.find((product) => product.type === productForm.category)?.image || products[0].image,
    }
    setSavedProducts((current) => [...current, newProduct])
    setProductForm({ brand: '', name: '', category: 'sneakers', color: '', price: '', description: '' })
    setProductFormOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>Complimentary delivery in Almaty on orders over ₸50,000</span>
        <span className="announcement-divider">·</span>
        <span>Easy 14-day returns</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Romans Shoe — home">
          ROMANS<span>SHOE</span>
          <span className="wordmark-period">.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#catalog">Shop</a>
          <a href="#about">About</a>
          <a href="#footer">Visit us</a>
        </nav>
        <div className="header-actions">
          <button
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            className={`icon-button ${searchOpen ? 'is-active' : ''}`}
            onClick={() => setSearchOpen((open) => !open)}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>
          <button
            aria-label={`Shopping bag, items: ${cartCount}`}
            className="cart-button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <span>Bag</span>
            <span className="cart-count">{String(cartCount).padStart(2, '0')}</span>
          </button>
          {loggedUser ? (
            <div className="account-actions">
              <span className="account-name">{loggedUser.name}</span>
              <button
                className="account-button"
                onClick={() => {
                  setLoggedUser(null)
                  setCheckoutMessage('')
                }}
                type="button"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              className="account-button"
              onClick={() => {
                setAuthNotice('')
                setAuthOpen(true)
              }}
              type="button"
            >
              Sign in
            </button>
          )}
        </div>
      </header>

      {searchOpen && (
        <form
          className="search-panel"
          onSubmit={(event) => {
            event.preventDefault()
            document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <label className="visually-hidden" htmlFor="site-search">
            Search shoes
          </label>
          <input
            autoFocus
            id="site-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search brands and styles..."
            type="search"
            value={search}
          />
          <button aria-label="Search" type="submit">
            <ArrowIcon />
          </button>
        </form>
      )}

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Independent sneaker boutique · Almaty</p>
            <h1>
              The sneaker
              <br />
              <span>edit.</span>
            </h1>
            <p className="hero-description">
              A considered selection of Nike, adidas, Reebok and ASICS — curated
              for everyday life in Almaty.
            </p>
            <a className="primary-link" href="#catalog">
              Shop the collection <ArrowIcon />
            </a>
            <div className="hero-note">
              <span className="hero-note-line" />
              <span>Selected in Almaty</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              alt="Red Nike Air Max sneaker"
              className="hero-image"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1500&q=90"
            />
            <div className="hero-image-caption">
              <span>01 / 03</span>
              <span>New season selection</span>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              R<span>S</span>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">ALMATY — KZ</div>
        </section>

        <section className="category-strip" aria-label="Shop by category">
          <div>
            <span className="section-kicker">Shop by category</span>
            <h2>Find your pair</h2>
          </div>
          <div className="category-links">
            {categories.slice(1).map((item, index) => (
              <button
                className="category-link"
                key={item.id}
                onClick={() => {
                  setCategory(item.id)
                  document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })
                }}
                type="button"
              >
                <span className="category-number">0{index + 1}</span>
                <span>{item.label}</span>
                <span className="category-arrow"><ArrowIcon diagonal /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="catalog-section" id="catalog">
          <div className="catalog-heading">
            <div>
              <span className="section-kicker">The Almaty edit</span>
              <h2>Shop the collection</h2>
            </div>
            <p>Iconic sneakers and everyday essentials from the brands you love.</p>
          </div>
          <div className="catalog-utilities">
            <button className="text-button add-product-trigger" onClick={() => setProductFormOpen((open) => !open)} type="button">
              {productFormOpen ? 'Close form' : 'Add a product'}
            </button>
            <button
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="theme-toggle"
              onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
              type="button"
            >
              {theme === 'light' ? 'Dark theme' : 'Light theme'}
            </button>
          </div>
          {productFormOpen && (
            <form className="product-entry-form" onSubmit={handleAddProduct}>
              <label>
                Brand
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, brand: event.target.value }))}
                  required
                  value={productForm.brand}
                />
              </label>
              <label>
                Product name
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                  required
                  value={productForm.name}
                />
              </label>
              <label>
                Category
                <select
                  onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))}
                  value={productForm.category}
                >
                  {categories.slice(1).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              <label>
                Color
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, color: event.target.value }))}
                  required
                  value={productForm.color}
                />
              </label>
              <label>
                Price, ₸
                <input
                  min="1"
                  onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                  required
                  type="number"
                  value={productForm.price}
                />
              </label>
              <label className="product-entry-description">
                Short description
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder="Materials, purpose or feature"
                  value={productForm.description}
                />
              </label>
              <button className="product-buy-button" type="submit">Save product</button>
            </form>
          )}
          <div className="catalog-controls">
            <div className="filter-list" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  aria-pressed={category === item.id}
                  className={`filter-button ${category === item.id ? 'is-selected' : ''}`}
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  type="button"
                >
                  {item.label}
                  <span>{String(item.id === 'all' ? allProducts.length : allProducts.filter((product) => product.type === item.id).length).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <div className="catalog-tools">
              <label className="sort-control">
                <span>Sort</span>
                <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </label>
              <span className="product-count">{filteredProducts.length} items</span>
            </div>
          </div>
          {(category !== 'all' || search || sortBy !== 'featured') && (
            <button className="reset-filters" onClick={resetCatalog} type="button">Clear filters</button>
          )}

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  index={index}
                  key={product.id}
                  onAdd={() => addToCart(product.id)}
                  onBuy={() => buyNow(product.id)}
                  onView={() => setSelectedProduct(product)}
                  product={product}
                  quantity={cart[product.id] || 0}
                  totalCount={filteredProducts.length}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>No products found</span>
              <p>Try another search or choose a different category.</p>
              <button
                className="text-button"
                onClick={() => {
                  resetCatalog()
                }}
                type="button"
              >
                Show all footwear <ArrowIcon />
              </button>
            </div>
          )}
        </section>

        <section className="manifesto" id="about">
          <div className="manifesto-image">
            <img
              alt="Detail of a sneaker from the Romans Shoe selection"
              loading="lazy"
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
            />
            <span className="manifesto-image-label">Considered from every angle</span>
          </div>
          <div className="manifesto-copy">
            <span className="section-kicker">Independent sneaker boutique</span>
            <h2>Global icons.<br /><em>Almaty point of view.</em></h2>
            <p>
              A handpicked mix of sport heritage and modern essentials, brought
              together for the city.
            </p>
            <a className="text-button" href="#catalog">
              Explore the collection <ArrowIcon />
            </a>
            <span className="manifesto-mark" aria-hidden="true">R.</span>
          </div>
        </section>

        <section className="service-row" aria-label="Store services">
          <div>
            <span className="service-number">01</span>
            <h3>Curated brands</h3>
            <p>Nike, adidas, Reebok and ASICS in one place.</p>
          </div>
          <div>
            <span className="service-number">02</span>
            <h3>Almaty delivery</h3>
            <p>Complimentary delivery on orders over ₸50,000.</p>
          </div>
          <div>
            <span className="service-number">03</span>
            <h3>Easy returns</h3>
            <p>Take 14 days to decide.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-top">
          <a className="wordmark footer-wordmark" href="#top">
            ROMANS<span>SHOE</span><span className="wordmark-period">.</span>
          </a>
          <p>Independent sneaker boutique · Almaty, Kazakhstan</p>
          <a className="footer-email" href="mailto:hello@romans.shoe">
            hello@romans.shoe <ArrowIcon diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Romans Shoe</span>
          <span>Demo storefront · Product availability and prices are illustrative</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          cartCount={cartCount}
          cartItems={cartItems}
          cartTotal={cartTotal}
          checkoutMessage={checkoutMessage}
          loggedUser={loggedUser}
          onBrowse={() => {
            setCartOpen(false)
            document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' })
          }}
          onCheckout={handleCheckout}
          onClose={() => setCartOpen(false)}
          onQuantityChange={changeQuantity}
          onRemove={removeFromCart}
        />
      )}

      {selectedProduct && (
        <ProductDetailDialog
          onAdd={() => {
            addToCart(selectedProduct.id)
            setSelectedProduct(null)
            setCartOpen(true)
          }}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}

      {authOpen && (
        <AuthDialog
          onClose={() => {
            setAuthOpen(false)
            setAuthNotice('')
          }}
          onLogin={handleLogin}
          onRegister={handleRegister}
          notice={authNotice}
        />
      )}
    </div>
  )
}

export default App
