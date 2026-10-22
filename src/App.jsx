import { useEffect, useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Спринт 01',
    category: 'Кроссовки',
    type: 'sneakers',
    color: 'Молочный / графит',
    price: 12990,
    badge: 'Бестселлер',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Городской ритм',
    category: 'Кроссовки',
    type: 'sneakers',
    color: 'Песочный',
    price: 14990,
    badge: 'Новинка',
    image:
      'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Формат 02',
    category: 'Туфли',
    type: 'shoes',
    color: 'Чёрная кожа',
    price: 17990,
    badge: '',
    image:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Треккинг 01',
    category: 'Ботинки',
    type: 'boots',
    color: 'Тёмный шоколад',
    price: 18990,
    badge: 'Для города',
    image:
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Лёгкий шаг',
    category: 'Кроссовки',
    type: 'sneakers',
    color: 'Белый / серый',
    price: 11990,
    badge: '',
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'Классика 03',
    category: 'Туфли',
    type: 'shoes',
    color: 'Коньячная кожа',
    price: 16990,
    badge: '',
    image:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7,
    name: 'Маршрут 02',
    category: 'Кроссовки',
    type: 'sneakers',
    color: 'Серый / лайм',
    price: 13990,
    badge: 'Новинка',
    description: 'Лёгкая пара с амортизирующей подошвой для длинных городских маршрутов.',
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 8,
    name: 'Север 01',
    category: 'Ботинки',
    type: 'boots',
    color: 'Чёрный',
    price: 20990,
    badge: '',
    description: 'Уверенная посадка и цепкий протектор для прохладной погоды.',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 9,
    name: 'Дерби 02',
    category: 'Туфли',
    type: 'shoes',
    color: 'Тёмно-коричневый',
    price: 18490,
    badge: '',
    description: 'Сдержанный силуэт для рабочих дней и особых случаев.',
    image:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 10,
    name: 'Темп 04',
    category: 'Кроссовки',
    type: 'sneakers',
    color: 'Белый / синий',
    price: 15490,
    badge: 'Бестселлер',
    description: 'Дышащий верх и мягкий шаг на каждый день.',
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 11,
    name: 'Линия 05',
    category: 'Туфли',
    type: 'shoes',
    color: 'Чёрная кожа',
    price: 19490,
    badge: '',
    description: 'Классическая форма с аккуратной отделкой и удобной колодкой.',
    image:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 12,
    name: 'Треккинг 03',
    category: 'Ботинки',
    type: 'boots',
    color: 'Оливковый',
    price: 22990,
    badge: 'Для маршрута',
    description: 'Поддержка голеностопа и рельефная подошва для прогулок за городом.',
    image:
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85',
  },
]

const categories = [
  { id: 'all', label: 'Вся обувь' },
  { id: 'sneakers', label: 'Кроссовки' },
  { id: 'boots', label: 'Ботинки' },
  { id: 'shoes', label: 'Туфли' },
]

const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`

const demoAccount = {
  name: 'Роман Демов',
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
          alt={`${product.category} ${product.name}, ${product.color}`}
          className="product-image"
          loading="lazy"
          src={product.image}
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="product-index">{String(index + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}</span>
        {quantity > 0 && <span className="in-cart-label">В корзине · {quantity}</span>}
      </div>
      <div className="product-info">
        <div>
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.description || `${product.color}. Комфортная пара на каждый день.`}</p>
        </div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <div className="product-actions">
        <button className="product-details-button" onClick={onView} type="button">
          Подробнее
        </button>
        <button className="product-buy-button" onClick={onAdd} type="button">
          В корзину
        </button>
        <button className="product-buy-now" onClick={onBuy} type="button">
          Купить
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
        <button aria-label="Закрыть детали товара" className="close-button modal-close" onClick={onClose} type="button">×</button>
        <img alt={`${product.category} ${product.name}`} src={product.image} />
        <div className="product-detail-copy">
          <span className="section-kicker">{product.category} · RS-{String(product.id).padStart(3, '0')}</span>
          <h2 id="product-detail-title">{product.name}</h2>
          <strong>{formatPrice(product.price)}</strong>
          <p>{product.description || `Модель ${product.name} создана для комфорта каждый день. ${product.color} легко сочетается с повседневным гардеробом.`}</p>
          <dl>
            <div><dt>Цвет</dt><dd>{product.color}</dd></div>
            <div><dt>Материал</dt><dd>{product.type === 'boots' ? 'Кожа и плотный текстиль' : 'Кожа и дышащий текстиль'}</dd></div>
            <div><dt>Доставка</dt><dd>Бесплатно от 15 000 ₽ · возврат 14 дней</dd></div>
          </dl>
          <button className="checkout-button" onClick={onAdd} type="button">
            Добавить в корзину <ArrowIcon />
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
        aria-label="Корзина"
        aria-modal="true"
        className="cart-drawer"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="cart-drawer-header">
          <div>
            <span className="section-kicker">Romans Shoe</span>
            <h2>Твоя корзина <span>({cartCount})</span></h2>
          </div>
          <button aria-label="Закрыть корзину" className="close-button" onClick={onClose} type="button">×</button>
        </div>
        {cartItems.length ? (
          <>
            <div className="cart-items">
              {cartItems.map((product) => (
                <div className="cart-item" key={product.id}>
                  <img alt="" src={product.image} />
                  <div className="cart-item-info">
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                    <div className="quantity-control">
                      <button aria-label={`Уменьшить количество ${product.name}`} onClick={() => onQuantityChange(product.id, -1)} type="button">−</button>
                      <span>{cart[product.id]}</span>
                      <button aria-label={`Увеличить количество ${product.name}`} onClick={() => onQuantityChange(product.id, 1)} type="button">+</button>
                    </div>
                  </div>
                  <button
                    aria-label={`Удалить ${product.name} из корзины`}
                    className="remove-cart-item"
                    onClick={() => onRemove(product.id)}
                    type="button"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Итого</span><strong>{formatPrice(cartTotal)}</strong></div>
              <button className="checkout-button" onClick={onCheckout} type="button">
                {loggedUser ? 'Оформить демо-заказ' : 'Войти для оформления'} <ArrowIcon />
              </button>
              {checkoutMessage ? <p className="checkout-message" role="status">{checkoutMessage}</p> : <p>Это демонстрационный заказ без оплаты.</p>}
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <span className="cart-empty-icon">R.</span>
            <h3>Здесь пока пусто</h3>
            <p>Самое время найти пару, которая подойдёт именно тебе.</p>
            <button className="primary-link" onClick={onBrowse} type="button">
              В каталог <ArrowIcon />
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
      else setError('Не удалось войти. Проверьте e-mail и пароль демо-аккаунта.')
      return
    }

    if (form.password.length < 8) {
      setError('Пароль должен содержать не менее 8 символов.')
      return
    }
    if (form.password !== form.confirmation) {
      setError('Пароли не совпадают.')
      return
    }
    if (!acceptedTerms) {
      setError('Подтвердите согласие с условиями.')
      return
    }

    const message = onRegister({ name: form.name.trim(), email: form.email.trim(), password: form.password })
    if (message) setSuccess(message)
    else setError('Для этого e-mail уже есть демо-аккаунт. Войдите в него.')
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
        <button aria-label="Закрыть" className="close-button modal-close" onClick={onClose} type="button">×</button>
        <span className="section-kicker">Romans Shoe · демо-аккаунт</span>
        <h2 id="auth-title">{success ? 'Готово' : mode === 'login' ? 'С возвращением' : 'Создать аккаунт'}</h2>
        {success ? (
          <div className="auth-success">
            <p>{success}</p>
            <button className="checkout-button" onClick={onClose} type="button">Продолжить</button>
          </div>
        ) : (
          <>
            {notice && <p className="auth-notice">{notice}</p>}
            {mode === 'login' && (
              <div className="demo-credentials">
                Демо-доступ: <strong>demo@romans.shoe</strong> / <strong>romans123</strong>
              </div>
            )}
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'register' && (
                <label>
                  Полное имя
                  <input autoComplete="name" onChange={updateForm('name')} required value={form.name} />
                </label>
              )}
              <label>
                E-mail
                <input autoComplete="email" onChange={updateForm('email')} required type="email" value={form.email} />
              </label>
              <label>
                Пароль
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
                    {showPassword ? 'Скрыть' : 'Показать'}
                  </button>
                </span>
              </label>
              {mode === 'register' && (
                <>
                  <label>
                    Повторите пароль
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
                    <span>Принимаю условия демо-сайта</span>
                  </label>
                </>
              )}
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="checkout-button" type="submit">
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'} <ArrowIcon />
              </button>
            </form>
            <p className="auth-switch">
              {mode === 'login' ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}{' '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                }}
                type="button"
              >
                {mode === 'login' ? 'Регистрация' : 'Войти'}
              </button>
            </p>
            <p className="demo-disclaimer">Это демонстрационный интерфейс. Не используйте реальные пароли и платёжные данные.</p>
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
      return Array.isArray(storedProducts) ? storedProducts : []
    } catch {
      return []
    }
  })
  const [productFormOpen, setProductFormOpen] = useState(false)
  const [productForm, setProductForm] = useState({ name: '', category: 'sneakers', color: '', price: '', description: '' })
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('romans-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authNotice, setAuthNotice] = useState('')
  const [loggedUser, setLoggedUser] = useState(null)
  const [registeredAccount, setRegisteredAccount] = useState(null)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const allProducts = useMemo(() => [...products, ...savedProducts], [savedProducts])

  useEffect(() => {
    try {
      localStorage.setItem('romans-products', JSON.stringify(savedProducts))
    } catch {}
  }, [savedProducts])

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
    const query = debouncedSearch.trim().toLocaleLowerCase('ru-RU')
    const matches = allProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.type === category
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.color}`
          .toLocaleLowerCase('ru-RU')
          .includes(query)
      return matchesCategory && matchesSearch
    })
    return matches.sort((first, second) => {
      if (sortBy === 'price-asc') return first.price - second.price
      if (sortBy === 'price-desc') return second.price - first.price
      if (sortBy === 'name-asc') return first.name.localeCompare(second.name, 'ru')
      if (sortBy === 'name-desc') return second.name.localeCompare(first.name, 'ru')
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
      return `Вы вошли как ${demoAccount.name}.`
    }
    if (registeredAccount && email === registeredAccount.email && password === registeredAccount.password) {
      setLoggedUser({ name: registeredAccount.name, email: registeredAccount.email })
      return `Вы вошли как ${registeredAccount.name}.`
    }
    return ''
  }

  const handleRegister = (account) => {
    if (account.email === demoAccount.email || account.email === registeredAccount?.email) return ''
    setRegisteredAccount(account)
    setLoggedUser({ name: account.name, email: account.email })
    return `Аккаунт для ${account.name} создан. Вы вошли в демо-режиме.`
  }

  const handleCheckout = () => {
    if (!loggedUser) {
      setCartOpen(false)
      setAuthNotice('Войдите или зарегистрируйтесь, чтобы перейти к демо-оформлению заказа.')
      setAuthOpen(true)
      return
    }
    setCheckoutMessage(`Демо-заказ подготовлен для ${loggedUser.name}. Оплата на сайте не производится.`)
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
      category: categories.find((item) => item.id === productForm.category).label,
      type: productForm.category,
      color: productForm.color.trim(),
      price: Number(productForm.price),
      badge: 'Новая модель',
      description: productForm.description.trim(),
      image: products.find((product) => product.type === productForm.category).image,
    }
    setSavedProducts((current) => [...current, newProduct])
    setProductForm({ name: '', category: 'sneakers', color: '', price: '', description: '' })
    setProductFormOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>Доставка бесплатно от 15 000 ₽</span>
        <span className="announcement-divider">·</span>
        <span>Возврат в течение 14 дней</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Romans Shoe — на главную">
          ROMANS<span>SHOE</span>
          <span className="wordmark-period">.</span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#catalog">Каталог</a>
          <a href="#about">О бренде</a>
          <a href="#footer">Контакты</a>
        </nav>
        <div className="header-actions">
          <button
            aria-label={searchOpen ? 'Закрыть поиск' : 'Открыть поиск'}
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
            aria-label={`Корзина, товаров: ${cartCount}`}
            className="cart-button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <span>Корзина</span>
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
                Выйти
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
              Войти
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
            Найти обувь
          </label>
          <input
            autoFocus
            id="site-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Найти свою пару..."
            type="search"
            value={search}
          />
          <button aria-label="Искать" type="submit">
            <ArrowIcon />
          </button>
        </form>
      )}

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Новая коллекция · 2026</p>
            <h1>
              Свой путь.
              <br />
              <span>Свой шаг.</span>
            </h1>
            <p className="hero-description">
              Обувь, в которой удобно быть собой. Продуманный дизайн на каждый
              день и далеко за его пределами.
            </p>
            <a className="primary-link" href="#catalog">
              Смотреть коллекцию <ArrowIcon />
            </a>
            <div className="hero-note">
              <span className="hero-note-line" />
              <span>Создано для движения</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              alt="Красные кроссовки Romans Shoe — акцентная пара новой коллекции"
              className="hero-image"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1500&q=90"
            />
            <div className="hero-image-caption">
              <span>01 / 03</span>
              <span>Коллекция движения</span>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              R<span>S</span>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 — 03</div>
        </section>

        <section className="category-strip" aria-label="Категории обуви">
          <div>
            <span className="section-kicker">Найди свою пару</span>
            <h2>Обувь на твой ритм</h2>
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
              <span className="section-kicker">Твоя следующая пара</span>
              <h2>Выбор Romans</h2>
            </div>
            <p>Комфортная база, которая работает каждый день.</p>
          </div>
          <div className="catalog-utilities">
            <button className="text-button add-product-trigger" onClick={() => setProductFormOpen((open) => !open)} type="button">
              {productFormOpen ? 'Закрыть форму' : 'Добавить модель'}
            </button>
            <button
              aria-label={`Переключить тему на ${theme === 'light' ? 'тёмную' : 'светлую'}`}
              className="theme-toggle"
              onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
              type="button"
            >
              {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            </button>
          </div>
          {productFormOpen && (
            <form className="product-entry-form" onSubmit={handleAddProduct}>
              <label>
                Название модели
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                  required
                  value={productForm.name}
                />
              </label>
              <label>
                Категория
                <select
                  onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))}
                  value={productForm.category}
                >
                  {categories.slice(1).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              <label>
                Цвет
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, color: event.target.value }))}
                  required
                  value={productForm.color}
                />
              </label>
              <label>
                Цена, ₽
                <input
                  min="1"
                  onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                  required
                  type="number"
                  value={productForm.price}
                />
              </label>
              <label className="product-entry-description">
                Краткое описание
                <input
                  onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder="Материал, назначение или особенность"
                  value={productForm.description}
                />
              </label>
              <button className="product-buy-button" type="submit">Сохранить модель</button>
            </form>
          )}
          <div className="catalog-controls">
            <div className="filter-list" aria-label="Фильтр по категориям">
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
                <span>Сортировка</span>
                <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
                  <option value="featured">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="name-asc">Название: А–Я</option>
                  <option value="name-desc">Название: Я–А</option>
                </select>
              </label>
              <span className="product-count">Найдено: {filteredProducts.length}</span>
            </div>
          </div>
          {(category !== 'all' || search || sortBy !== 'featured') && (
            <button className="reset-filters" onClick={resetCatalog} type="button">Сбросить фильтры</button>
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
              <span>Пока ничего не нашли</span>
              <p>Попробуй изменить запрос или выбрать другую категорию.</p>
              <button
                className="text-button"
                onClick={() => {
                  resetCatalog()
                }}
                type="button"
              >
                Показать всю обувь <ArrowIcon />
              </button>
            </div>
          )}
        </section>

        <section className="manifesto" id="about">
          <div className="manifesto-image">
            <img
              alt="Деталь кроссовка из коллекции Romans Shoe"
              loading="lazy"
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
            />
            <span className="manifesto-image-label">Материал имеет значение</span>
          </div>
          <div className="manifesto-copy">
            <span className="section-kicker">Философия Romans</span>
            <h2>Меньше шума.<br /><em>Больше движения.</em></h2>
            <p>
              Мы верим в вещи, которые не нужно менять каждый сезон. Честные
              материалы, удобная посадка и форма, которая остаётся актуальной.
            </p>
            <a className="text-button" href="#catalog">
              Познакомиться с коллекцией <ArrowIcon />
            </a>
            <span className="manifesto-mark" aria-hidden="true">R.</span>
          </div>
        </section>

        <section className="service-row" aria-label="Преимущества магазина">
          <div>
            <span className="service-number">01</span>
            <h3>Продуманная посадка</h3>
            <p>Комфорт, который чувствуешь с первого шага.</p>
          </div>
          <div>
            <span className="service-number">02</span>
            <h3>Доставка по России</h3>
            <p>Бережно упакуем и отправим твою пару.</p>
          </div>
          <div>
            <span className="service-number">03</span>
            <h3>Лёгкий возврат</h3>
            <p>14 дней, чтобы принять решение.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-top">
          <a className="wordmark footer-wordmark" href="#top">
            ROMANS<span>SHOE</span><span className="wordmark-period">.</span>
          </a>
          <p>Свой путь. Свой шаг.</p>
          <a className="footer-email" href="mailto:hello@romans.shoe">
            hello@romans.shoe <ArrowIcon diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Romans Shoe</span>
          <span>Обувь для твоего движения</span>
          <a href="#top">Наверх ↑</a>
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
