'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useSession } from '@/hooks/use-session'
import { useUserProfile } from '@/hooks/use-user-profile'
import { useQueryClient } from '@tanstack/react-query'

export default function SettingsPage() {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const { data: session, isLoading: sessionLoading } = useSession()
  const { data: profileData, isLoading: profileLoading } = useUserProfile(session?.userId)

  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    website_url: '',
    twitter_handle: '',
    is_profile_public: true,
  })

  useEffect(() => {
    if (profileData) {
      setProfile({
        username: profileData.username || '',
        bio: profileData.bio || '',
        website_url: profileData.website_url || '',
        twitter_handle: profileData.twitter_handle || '',
        is_profile_public: profileData.is_profile_public,
      })
    }
  }, [profileData])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (!session?.userId) {
        toast.error('Not authenticated')
        return
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({
          bio: profile.bio || null,
          website_url: profile.website_url || null,
          twitter_handle: profile.twitter_handle || null,
          is_profile_public: profile.is_profile_public,
        })
        .eq('id', session.userId)

      if (error) throw error
      queryClient.invalidateQueries({ queryKey: ['user-profile', session.userId] })

      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/@${profile.username}`
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    toast.success('Profile link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (sessionLoading || profileLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⚙️</div>
          <p className="text-foreground-tertiary">Loading settings...</p>
        </div>
      </div>
    )
  }

  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/@${profile.username}`

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-foreground-tertiary">Manage your profile and preferences</p>
        </div>

        <div className="bg-background-secondary border border-border rounded-lg p-8 space-y-8">
          {/* Public Profile */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Public Profile</h2>

            <div className="space-y-4">
              {/* Username (Read-only) */}
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={profile.username} disabled className="bg-background-tertiary" />
                <p className="text-xs text-foreground-tertiary">
                  Username cannot be changed
                </p>
              </div>

              {/* Profile URL */}
              <div className="space-y-2">
                <Label>Profile URL</Label>
                <div className="flex gap-2">
                  <Input value={profileUrl} disabled className="bg-background-tertiary" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={copyProfileLink}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                    <Button type="button" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Public Toggle */}
              <div className="flex items-center justify-between py-3 px-4 bg-background rounded-lg border border-border">
                <div>
                  <Label htmlFor="public-profile" className="text-base font-medium">
                    Public Profile
                  </Label>
                  <p className="text-sm text-foreground-tertiary mt-1">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch
                  id="public-profile"
                  checked={profile.is_profile_public}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, is_profile_public: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">About</h2>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell the world about yourself..."
                rows={4}
                maxLength={200}
              />
              <p className="text-xs text-foreground-tertiary text-right">
                {profile.bio.length}/200
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={profile.website_url}
                  onChange={(e) => setProfile({ ...profile, website_url: e.target.value })}
                  placeholder="https://yoursite.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter Handle</Label>
                <Input
                  id="twitter"
                  value={profile.twitter_handle}
                  onChange={(e) => setProfile({ ...profile, twitter_handle: e.target.value })}
                  placeholder="@username"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary-hover text-white"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
