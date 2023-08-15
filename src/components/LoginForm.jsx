import React, { useRef, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useAuth } from '@hooks/useAuth'
import { useRouter } from 'next/router'
import Loading from './common/Loading'
import Link from 'next/link'

export default function LoginForm() {
  const formRef = useRef()
  const { signIn } = useAuth()
  const router = useRouter()
  const [submitError, setSubmitError] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const formFields = new FormData(formRef.current)
    const emailField = formFields.get('email')
    const pwdField = formFields.get('password')
    setSubmitError(null)
    setSubmitLoading(true)
    signIn(emailField, pwdField)
      .then(() => {
        router.push('/dashboard')
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          setSubmitError('It looks like either your email or password are incorrect. Please try again')
        } else if (err?.request) {
          setSubmitError(`Error ${err?.response?.data?.statusCode}, ${err?.response?.data?.message}`)
        } else {
          setSubmitError('Something went wrong. Please try again later')
        }
        setSubmitLoading(false)
      })
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" ref={formRef} onSubmit={handleSubmitForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    submitError ? `border-red-300 focus:ring-red-500 focus:border-red-500` : `border-gray-300  focus:ring-indigo-500 focus:border-indigo-500`
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    submitError ? `border-red-300 focus:ring-red-500 focus:border-red-500` : `border-gray-300  focus:ring-indigo-500 focus:border-indigo-500`
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
            {submitLoading && <Loading />}
            {submitError && (
              <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span className="font-medium">{submitError}</span>
              </div>
            )}
            <div className="flex items-center justify-center ">
              <div className="text-sm">
                <p className="font-medium text-gray-600">
                  Forgot your password?{' '}
                  <Link href="*" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Retreive it here
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <div className="text-sm">
                <p className="font-medium text-gray-600">
                  Do not have an account?{' '}
                  <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create one here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
