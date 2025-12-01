/**
 * components/Login.js
 *
 * Login component for user authentication.
 * Features:
 * - Email and password input fields
 * - Form validation
 * - Error handling
 * - Link to register page
 * - Responsive design
 * - Accessibility features
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './Login.module.css'

/**
 * Login component.
 * Handles user authentication form.
 *
 * @returns {JSX.Element} Login component JSX
 */
export default function Login () {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle input field changes.
   *
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  /**
   * Validate form data.
   *
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle form submission.
   *
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would make an API call here
      // const response = await fetch('/api/auth/login', { ... })
      // const data = await response.json()

      // For demo purposes, just redirect to home
      router.push('/')
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Sign In</h1>
          <p className={styles.loginSubtitle}>
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {/* Email field */}
          <div className={styles.formGroup}>
            <label htmlFor='email' className={styles.label}>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder='Enter your email'
              aria-label='Email address'
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id='email-error' className={styles.errorMessage} role='alert'>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password field */}
          <div className={styles.formGroup}>
            <label htmlFor='password' className={styles.label}>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder='Enter your password'
              aria-label='Password'
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span id='password-error' className={styles.errorMessage} role='alert'>
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember me and forgot password */}
          <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input type='checkbox' className={styles.checkbox} />
              <span>Remember me</span>
            </label>
            <Link href='/forgot-password' className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div className={styles.submitError} role='alert'>
              {errors.submit}
            </div>
          )}

          {/* Submit button */}
          <button
            type='submit'
            className={styles.submitButton}
            disabled={isLoading}
            aria-label='Sign in'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Register link */}
        <div className={styles.registerLink}>
          <p>
            Don&apos;t have an account?{' '}
            <Link href='/register' className={styles.link}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

