import { useEffect, useMemo, useState } from 'react'

// Initial deal products (minimum 6 required, 8 provided)
// Dates are generated relative to now so countdowns are always active upon page load
const generateInitialSaleProducts = () => {
  const now = Date.now()
  return [
    {
      id: 'sale-1',
      brand: 'Nike',
      name: 'Dunk Low Retro SE "Industrial Blue"',
      oldPrice: 72900,
      discountPercent: 35,
      image:
        'https://static.nike.com/a/images/t_PDP_144_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/AIR+FORCE+1+%2707.png',
      // Ends in 2 days, 5 hours, 30 minutes
      endTime: new Date(now + 2 * 86400000 + 5 * 3600000 + 30 * 60000).toISOString(),
    },
    {
      id: 'sale-2',
      brand: 'adidas',
      name: 'Samba OG "Night Navy"',
      oldPrice: 58900,
      discountPercent: 25,
      image:
        'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_00_standard.jpg',
      // Ends in 1 day, 14 hours
      endTime: new Date(now + 1 * 86400000 + 14 * 3600000).toISOString(),
    },
    {
      id: 'sale-3',
      brand: 'ASICS',
      name: 'GEL-Kayano 14 "Metallic Silver"',
      oldPrice: 84900,
      discountPercent: 40,
      image:
        'https://images.asics.com/is/image/asics/1203A275_115_SL_LT_GLB?$sfcc-product$&fmt=jpg&wid=1000',
      // Ends in 8 hours, 45 minutes
      endTime: new Date(now + 8 * 3600000 + 45 * 60000).toISOString(),
    },
    {
      id: 'sale-4',
      brand: 'Reebok',
      name: 'Club C 85 Vintage "Chalk / Green"',
      oldPrice: 52900,
      discountPercent: 30,
      image:
        'https://www.reebok.com/cdn/shop/files/100000154_SLC_eCom_e8e16aea-6c4e-45a6-b3c7-2a2973581caa.jpg?v=1774529995&width=1000',
      // Ends in 3 days, 12 hours
      endTime: new Date(now + 3 * 86400000 + 12 * 3600000).toISOString(),
    },
    {
      id: 'sale-5',
      brand: 'Nike',
      name: 'Air Max 90 "Infrared Heritage"',
      oldPrice: 79900,
      discountPercent: 20,
      image:
        'https://static.nike.com/a/images/t_PDP_144_v1/f_auto,q_auto:eco/w2ldynwtyuspv6r5rffj/AIR+MAX+90.png',
      // Ends in 18 hours, 15 minutes
      endTime: new Date(now + 18 * 3600000 + 15 * 60000).toISOString(),
    },
    {
      id: 'sale-6',
      brand: 'Puma',
      name: 'Suede Classic XXI "Black / White"',
      oldPrice: 44900,
      discountPercent: 45,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85',
      // Quick timer: 45 seconds for interactive live testing!
      endTime: new Date(now + 45 * 1000).toISOString(),
    },
    {
      id: 'sale-7',
      brand: 'adidas',
      name: 'Gazelle Indoor "Collegiate Green"',
      oldPrice: 64900,
      discountPercent: 50,
      image:
        'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5643ea9848e94c1da869fd176bd19128_9366/Superstar_II_Shoes_White_IH8659_01_standard.jpg',
      // Ends in 4 days, 2 hours
      endTime: new Date(now + 4 * 86400000 + 2 * 3600000).toISOString(),
    },
    {
      id: 'sale-8',
      brand: 'Reebok',
      name: 'Classic Leather "Triple White"',
      oldPrice: 49900,
      discountPercent: 30,
      image:
        'https://www.reebok.eu/cdn/shop/files/JPG-100008491_SLC_eCom.jpg?v=1758538069&width=1000',
      // Expired deal: ended 1 hour ago to demonstrate "Sale Expired" immediately
      endTime: new Date(now - 3600000).toISOString(),
    },
  ]
}

// Helper to compute remaining days, hours, minutes, seconds
function calculateTimeLeft(targetTime) {
  const diff = new Date(targetTime).getTime() - Date.now()

  if (diff <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    }
  }

  const seconds = Math.floor((diff / 1000) % 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return {
    total: diff,
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  }
}

/**
 * Countdown Timer Component
 * Demonstrates:
 * - useState: stores the remaining time state
 * - useEffect: sets up the 1-second interval
 * - setInterval & clearInterval: ticks every second and cleans up on unmount or expiration
 * - Displays Days, Hours, Minutes, Seconds
 * - When 00:00:00 reached -> displays "Sale Expired"
 */
function SaleCountdownTimer({ endTime, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime))

  useEffect(() => {
    // If already expired at mount, trigger callback and skip interval
    if (timeLeft.isExpired) {
      if (onExpire) onExpire()
      return
    }

    const timerId = setInterval(() => {
      const updated = calculateTimeLeft(endTime)
      setTimeLeft(updated)

      if (updated.isExpired) {
        clearInterval(timerId)
        if (onExpire) onExpire()
      }
    }, 1000)

    // Cleanup: clear interval when component unmounts or endTime changes
    return () => clearInterval(timerId)
  }, [endTime, timeLeft.isExpired, onExpire])

  if (timeLeft.isExpired) {
    return (
      <div className="sale-expired-indicator" role="status">
        <span className="expired-dot" aria-hidden="true" />
        <span className="expired-text">Sale Expired</span>
      </div>
    )
  }

  return (
    <div className="sale-countdown-box" aria-label="Discount countdown timer">
      <span className="countdown-prefix">Ends in:</span>
      <div className="countdown-timer-grid">
        <div className="time-block">
          <span className="time-digits">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="time-unit">d</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-block">
          <span className="time-digits">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="time-unit">h</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-block">
          <span className="time-digits">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="time-unit">m</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-block">
          <span className="time-digits">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="time-unit">s</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Individual Product Card Component
 * Requirements:
 * - Product image
 * - Product name
 * - Old price (struck through)
 * - New price with discount
 * - Discount amount in percent (-X%)
 * - Countdown timer (days, hours, minutes, seconds)
 * - "Buy Now" / "Add to Cart" button
 * - "Sale Expired" label after timer reaches 00:00:00
 */
function SaleProductCard({ product, formatPrice, onAddToCart, onBuyNow }) {
  const [isExpired, setIsExpired] = useState(() => calculateTimeLeft(product.endTime).isExpired)

  // Calculate discounted price
  const discountPrice = Math.round(product.oldPrice * (1 - product.discountPercent / 100))
  const currentPrice = isExpired ? product.oldPrice : discountPrice

  const handleExpire = () => {
    setIsExpired(true)
  }

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: currentPrice,
    })
  }

  const handleBuyNow = () => {
    onBuyNow({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: currentPrice,
    })
  }

  return (
    <article className={`sale-card ${isExpired ? 'is-expired' : ''}`}>
      <div className="sale-card-media">
        <img
          alt={`${product.brand} ${product.name}`}
          className="sale-card-img"
          loading="lazy"
          src={product.image}
        />
        {/* Discount badge */}
        {!isExpired ? (
          <span className="sale-discount-badge">−{product.discountPercent}%</span>
        ) : (
          <span className="sale-expired-tag">Sale Expired</span>
        )}
      </div>

      <div className="sale-card-body">
        <div className="sale-card-brand">{product.brand}</div>
        <h3 className="sale-card-name">{product.name}</h3>

        {/* Countdown Timer */}
        <div className="sale-card-timer-wrap">
          <SaleCountdownTimer endTime={product.endTime} onExpire={handleExpire} />
        </div>

        {/* Pricing block: Old struck-through price & New discounted price */}
        <div className="sale-card-pricing">
          {!isExpired ? (
            <>
              <span className="sale-old-price" aria-label={`Original price: ${formatPrice(product.oldPrice)}`}>
                {formatPrice(product.oldPrice)}
              </span>
              <strong className="sale-new-price" aria-label={`Discounted price: ${formatPrice(discountPrice)}`}>
                {formatPrice(discountPrice)}
              </strong>
            </>
          ) : (
            <div className="sale-expired-pricing">
              <strong className="sale-regular-price">{formatPrice(product.oldPrice)}</strong>
              <span className="sale-regular-label">Regular price</span>
            </div>
          )}
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="sale-card-actions">
          <button
            className="sale-add-btn"
            onClick={handleAddToCart}
            type="button"
          >
            Add to Cart
          </button>
          <button
            className="sale-buy-btn"
            onClick={handleBuyNow}
            type="button"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  )
}

/**
 * Flash Sale Section Component
 * Requirements:
 * - Minimum 6 cards rendered via map()
 * - Sorting by price and discount percent using sort()
 * - Responsive grid layout
 * - Interactive quick test button
 */
export function FlashSaleSection({ formatPrice, onAddToCart, onBuyNow }) {
  const [saleProducts, setSaleProducts] = useState(generateInitialSaleProducts)
  const [sortBy, setSortBy] = useState('discount-desc')
  const [filterMode, setFilterMode] = useState('all') // 'all' | 'active' | 'expired'

  // Sort products using JavaScript Array.prototype.sort()
  const sortedProducts = useMemo(() => {
    const list = [...saleProducts]

    // Filter if needed
    const filtered = list.filter((item) => {
      const expired = calculateTimeLeft(item.endTime).isExpired
      if (filterMode === 'active') return !expired
      if (filterMode === 'expired') return expired
      return true
    })

    // Sort according to selected criteria
    return filtered.sort((a, b) => {
      const aDiscountPrice = Math.round(a.oldPrice * (1 - a.discountPercent / 100))
      const bDiscountPrice = Math.round(b.oldPrice * (1 - b.discountPercent / 100))

      if (sortBy === 'price-asc') {
        return aDiscountPrice - bDiscountPrice
      }
      if (sortBy === 'price-desc') {
        return bDiscountPrice - aDiscountPrice
      }
      if (sortBy === 'discount-desc') {
        return b.discountPercent - a.discountPercent
      }
      if (sortBy === 'discount-asc') {
        return a.discountPercent - b.discountPercent
      }
      if (sortBy === 'ending-soon') {
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
      }
      return 0
    })
  }, [saleProducts, sortBy, filterMode])

  // Helper button to set Puma's timer to 15 seconds to easily test the transition live
  const handleQuickTestTimer = () => {
    setSaleProducts((prev) =>
      prev.map((item) =>
        item.id === 'sale-6'
          ? { ...item, endTime: new Date(Date.now() + 15 * 1000).toISOString() }
          : item,
      ),
    )
  }

  // Helper button to reset all timers to fresh values
  const handleResetTimers = () => {
    setSaleProducts(generateInitialSaleProducts())
  }

  return (
    <section className="flash-sale-section" id="flash-sale" aria-labelledby="flash-sale-title">
      <div className="flash-sale-header">
        <div className="flash-sale-title-wrap">
          <span className="section-kicker">Limited Time Deals</span>
          <h2 id="flash-sale-title">Flash Sale &amp; Countdown Deals</h2>
          <p>
            Exclusive discounts with live countdown timers. Grab your favorite sneakers before
            the discount expires!
          </p>
        </div>

        {/* Interactive timer test triggers */}
        <div className="flash-sale-testing-controls">
          <button
            className="test-timer-btn"
            onClick={handleQuickTestTimer}
            title="Sets Puma Suede countdown to 15 seconds to test live expiration"
            type="button"
          >
            ⚡ Test 15s Timer
          </button>
          <button
            className="reset-timer-btn"
            onClick={handleResetTimers}
            title="Reset all countdown timers"
            type="button"
          >
            ↺ Reset Timers
          </button>
        </div>
      </div>

      {/* Sorting & Filter Controls */}
      <div className="flash-sale-toolbar">
        <div className="sale-filter-buttons" role="group" aria-label="Filter sale deals">
          <button
            className={`sale-filter-btn ${filterMode === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilterMode('all')}
            type="button"
          >
            All Deals ({saleProducts.length})
          </button>
          <button
            className={`sale-filter-btn ${filterMode === 'active' ? 'is-active' : ''}`}
            onClick={() => setFilterMode('active')}
            type="button"
          >
            Active Deals (
            {saleProducts.filter((p) => !calculateTimeLeft(p.endTime).isExpired).length})
          </button>
          <button
            className={`sale-filter-btn ${filterMode === 'expired' ? 'is-active' : ''}`}
            onClick={() => setFilterMode('expired')}
            type="button"
          >
            Sale Expired (
            {saleProducts.filter((p) => calculateTimeLeft(p.endTime).isExpired).length})
          </button>
        </div>

        <div className="sale-sort-wrapper">
          <label htmlFor="sale-sort-select">
            <span>Sort By:</span>
          </label>
          <select
            id="sale-sort-select"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="discount-desc">Discount: High to Low (% ↓)</option>
            <option value="discount-asc">Discount: Low to High (% ↑)</option>
            <option value="price-asc">Price: Low to High (₸ ↑)</option>
            <option value="price-desc">Price: High to Low (₸ ↓)</option>
            <option value="ending-soon">Ending Soonest</option>
          </select>
        </div>
      </div>

      {/* Responsive Cards Grid (min 6 items, rendered via map) */}
      <div className="sale-products-grid">
        {sortedProducts.map((product) => (
          <SaleProductCard
            formatPrice={formatPrice}
            key={product.id}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}
