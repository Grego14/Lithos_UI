import { useId, useState } from 'react'
import { Skeleton } from '../../../components/ui/Skeleton'
import { Card, CardContent } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Button } from '../../../components/ui/Button'

export const SkeletonProfileForm = () => {
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const id = useId()

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center justify-between mb-5">
        <p className="my-1 text-xs font-bold uppercase tracking-widest">Account settings</p>
        <Button
          variant="secondary"
          className="my-1 text-xs"
          onClick={() => {
            setLoading(!loading)
            setSaved(false)
          }}
        >
          {loading ? 'Load profile' : 'Reload profile'}
        </Button>
      </div>
      <Card>
        <CardContent>
          <form
            aria-label="Profile settings"
            aria-busy={loading}
            onSubmit={(event) => {
              event.preventDefault()
              setSaved(true)
            }}
          >
            <h3 className="text-xl font-black mb-6">Your profile</h3>
            <div className="mb-5">
              <label htmlFor={`${id}-name`} className="block text-sm font-bold mb-2">
                Name
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <Input id={`${id}-name`} name="name" defaultValue="Alex Morgan" required autoComplete="name" />
              )}
            </div>
            <div className="mb-5">
              <label htmlFor={`${id}-email`} className="block text-sm font-bold mb-2">
                Email
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <Input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  defaultValue="alex@example.com"
                  required
                  autoComplete="email"
                />
              )}
            </div>
            <div className="mb-6">
              <p className="text-sm font-bold mb-2">Role</p>
              <div className="h-10">
                {loading ? (
                  <Skeleton height={40} />
                ) : (
                  <Select
                    label="Role"
                    defaultValue="designer"
                    options={[
                      { label: 'Designer', value: 'designer' },
                      { label: 'Developer', value: 'developer' },
                    ]}
                    className="w-full h-10"
                  />
                )}
              </div>
            </div>
            {loading ? (
              <Skeleton height={40} width={144} tone="accent" />
            ) : (
              <Button type="submit" className="h-10 w-36">
                Save profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <p role="status" className="mt-4 min-h-5 text-xs font-body opacity-70">
        {loading
          ? 'Loading profile…'
          : saved
            ? 'Demo profile saved locally in this preview.'
            : 'Profile ready to edit. This is a local demo.'}
      </p>
    </div>
  )
}
