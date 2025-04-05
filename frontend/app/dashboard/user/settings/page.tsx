'use client'

import { Bell, Lock, User, CreditCard, Globe, Shield, FileText, Building2, Phone, Mail, AlertCircle, Check } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    ssn: ""
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Contact Information state
  const [contactInfo, setContactInfo] = useState({
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    preferredContact: "Email"
  })
  const [isContactSaving, setIsContactSaving] = useState(false)
  const [contactSaveSuccess, setContactSaveSuccess] = useState(false)

  // Policy Information state
  const [policyInfo, setPolicyInfo] = useState({
    policyNumber: "",
    provider: "",
    type: "Auto Insurance",
    status: "Active"
  })
  const [isPolicySaving, setIsPolicySaving] = useState(false)
  const [policySaveSuccess, setPolicySaveSuccess] = useState(false)

  // Claim Preferences state
  const [claimPreferences, setClaimPreferences] = useState({
    statusUpdates: true,
    documentUploads: true,
    paymentUpdates: true
  })
  const [isPreferencesSaving, setIsPreferencesSaving] = useState(false)
  const [preferencesSaveSuccess, setPreferencesSaveSuccess] = useState(false)

  // Security Settings state
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false
  })
  const [isSecuritySaving, setIsSecuritySaving] = useState(false)
  const [securitySaveSuccess, setSecuritySaveSuccess] = useState(false)

  // Document Management state
  const [documentSettings, setDocumentSettings] = useState({
    retentionPeriod: "1 Year"
  })
  const [isDocumentSaving, setIsDocumentSaving] = useState(false)
  const [documentSaveSuccess, setDocumentSaveSuccess] = useState(false)

  // Handle personal info input changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle contact info input changes
  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle policy info changes
  const handlePolicyInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setPolicyInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle claim preferences changes
  const handleClaimPreferencesChange = (name: string) => {
    setClaimPreferences(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }))
  }

  // Handle security settings changes
  const handleSecuritySettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Handle document settings changes
  const handleDocumentSettingsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setDocumentSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle personal info form submission
  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setSaveSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  // Handle contact info form submission
  const handleContactInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsContactSaving(false)
    setContactSaveSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setContactSaveSuccess(false)
    }, 3000)
  }

  // Handle policy info form submission
  const handlePolicyInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPolicySaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsPolicySaving(false)
    setPolicySaveSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setPolicySaveSuccess(false)
    }, 3000)
  }

  // Handle claim preferences submission
  const handleClaimPreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPreferencesSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsPreferencesSaving(false)
    setPreferencesSaveSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setPreferencesSaveSuccess(false)
    }, 3000)
  }

  // Handle security settings submission
  const handleSecuritySettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSecuritySaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSecuritySaving(false)
    setSecuritySaveSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSecuritySaveSuccess(false)
    }, 3000)
  }

  // Handle document settings submission
  const handleDocumentSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDocumentSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsDocumentSaving(false)
    setDocumentSaveSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setDocumentSaveSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your insurance account settings and preferences.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center gap-4 border-b p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
          <form onSubmit={handlePersonalInfoSubmit} className="p-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={personalInfo.dateOfBirth}
                onChange={handlePersonalInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Social Security Number</label>
              <input
                type="password"
                name="ssn"
                value={personalInfo.ssn}
                onChange={handlePersonalInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="•••-••-••••"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              {saveSuccess && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Changes saved successfully</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center gap-4 border-b p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Contact Information</h2>
          </div>
          <form onSubmit={handleContactInfoSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Phone</label>
              <input
                type="tel"
                name="primaryPhone"
                value={contactInfo.primaryPhone}
                onChange={handleContactInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary Phone</label>
              <input
                type="tel"
                name="secondaryPhone"
                value={contactInfo.secondaryPhone}
                onChange={handleContactInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="(555) 987-6543"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Contact Method</label>
              <select
                name="preferredContact"
                value={contactInfo.preferredContact}
                onChange={handleContactInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option>Email</option>
                <option>Phone</option>
                <option>Mail</option>
                <option>Text Message</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isContactSaving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isContactSaving ? "Saving..." : "Update Contact Info"}
              </button>
              {contactSaveSuccess && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Contact info updated successfully</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Policy Information */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center gap-4 border-b p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Policy Information</h2>
          </div>
          <form onSubmit={handlePolicyInfoSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Policy Number</label>
              <input
                type="text"
                name="policyNumber"
                value={policyInfo.policyNumber}
                onChange={handlePolicyInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="POL-123456789"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Insurance Provider</label>
              <input
                type="text"
                name="provider"
                value={policyInfo.provider}
                onChange={handlePolicyInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Insurance Company Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Policy Type</label>
              <select
                name="type"
                value={policyInfo.type}
                onChange={handlePolicyInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option>Auto Insurance</option>
                <option>Home Insurance</option>
                <option>Health Insurance</option>
                <option>Life Insurance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Policy Status</label>
              <select
                name="status"
                value={policyInfo.status}
                onChange={handlePolicyInfoChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Expired</option>
                <option>Renewal Pending</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isPolicySaving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPolicySaving ? "Saving..." : "Update Policy Info"}
              </button>
              {policySaveSuccess && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Policy info updated successfully</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Claim Preferences */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center gap-4 border-b p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Claim Preferences</h2>
          </div>
          <form onSubmit={handleClaimPreferencesSubmit} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Claim Status Updates</p>
                <p className="text-sm text-muted-foreground">Receive updates about your claim status</p>
              </div>
              <button
                type="button"
                onClick={() => handleClaimPreferencesChange('statusUpdates')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  claimPreferences.statusUpdates ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    claimPreferences.statusUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Document Upload Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when new documents are uploaded</p>
              </div>
              <button
                type="button"
                onClick={() => handleClaimPreferencesChange('documentUploads')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  claimPreferences.documentUploads ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    claimPreferences.documentUploads ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Payment Status Updates</p>
                <p className="text-sm text-muted-foreground">Receive updates about claim payments</p>
              </div>
              <button
                type="button"
                onClick={() => handleClaimPreferencesChange('paymentUpdates')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  claimPreferences.paymentUpdates ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    claimPreferences.paymentUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isPreferencesSaving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPreferencesSaving ? "Saving..." : "Save Preferences"}
              </button>
              {preferencesSaveSuccess && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Preferences updated successfully</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center gap-4 border-b p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <form onSubmit={handleSecuritySettingsSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={securitySettings.currentPassword}
                onChange={handleSecuritySettingsChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={securitySettings.newPassword}
                onChange={handleSecuritySettingsChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={securitySettings.confirmPassword}
                onChange={handleSecuritySettingsChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <button
                type="button"
                onClick={() => setSecuritySettings(prev => ({
                  ...prev,
                  twoFactorEnabled: !prev.twoFactorEnabled
                }))}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  securitySettings.twoFactorEnabled ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    securitySettings.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSecuritySaving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSecuritySaving ? "Saving..." : "Update Security Settings"}
              </button>
              {securitySaveSuccess && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Security settings updated successfully</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Document Management */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center gap-4 border-b p-6">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Document Management</h2>
          </div>
          <form onSubmit={handleDocumentSettingsSubmit} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Document Storage</p>
                <p className="text-sm text-muted-foreground">Manage your claim-related documents</p>
              </div>
              <button
                type="button"
                className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
              >
                Manage Documents
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Document Retention</p>
                <p className="text-sm text-muted-foreground">Set how long to keep your documents</p>
              </div>
              <select
                name="retentionPeriod"
                value={documentSettings.retentionPeriod}
                onChange={handleDocumentSettingsChange}
                className="rounded-md border bg-background px-3 py-1.5 text-sm"
              >
                <option>1 Year</option>
                <option>2 Years</option>
                <option>5 Years</option>
                <option>Indefinitely</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isDocumentSaving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDocumentSaving ? "Saving..." : "Save Document Settings"}
              </button>
              {documentSaveSuccess && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Document settings updated successfully</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 