/**
 * components/Register.js
 *
 * Register component for user registration.
 * Features:
 * - Name, email, password, and confirm password fields
 * - Form validation
 * - Error handling
 * - Link to login page
 * - Responsive design
 * - Accessibility features
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './Register.module.css'

/**
 * Register component.
 * Handles user registration form.
 *
 * @returns {JSX.Element} Register component JSX
 */
export default function Register () {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      // const response = await fetch('/api/auth/register', { ... })
      // const data = await response.json()

      // For demo purposes, redirect to login
      router.push('/login')
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>Create Account</h1>
          <p className={styles.registerSubtitle}>
            Sign up to get started with your account.
          </p>
        </div>

        <form className={styles.registerForm} onSubmit={handleSubmit}>
          {/* Name field */}
          <div className={styles.formGroup}>
            <label htmlFor='name' className={styles.label}>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder='Enter your full name'
              aria-label='Full name'
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id='name-error' className={styles.errorMessage} role='alert'>
                {errors.name}
              </span>
            )}
          </div>

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
              placeholder='Create a password'
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

          {/* Confirm Password field */}
          <div className={styles.formGroup}>
            <label htmlFor='confirmPassword' className={styles.label}>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder='Confirm your password'
              aria-label='Confirm password'
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
            />
            {errors.confirmPassword && (
              <span id='confirm-password-error' className={styles.errorMessage} role='alert'>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Terms and conditions */}
          <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input type='checkbox' className={styles.checkbox} required />
              <span>
                I agree to the{' '}
                <Link href='/terms' className={styles.inlineLink}>
                  Terms and Conditions
                </Link>
              </span>
            </label>
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
            aria-label='Create account'
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login link */}
        <div className={styles.loginLink}>
          <p>
            Already have an account?{' '}
            <Link href='/login' className={styles.link}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

