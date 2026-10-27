import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs'

export const DefaultTabs = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm font-bold">Account Settings</p>
        <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm font-bold">Password Settings</p>
        <p className="text-sm mt-2 opacity-80">Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}
