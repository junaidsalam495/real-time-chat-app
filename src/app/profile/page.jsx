"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      toast.success("Your profile has been updated successfully.")
    } catch (error) {
      toast.error("There was an error updating your profile.");
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-2xl py-8">
        <div className="flex items-center mb-6">
          <Link href="/chat" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to chat
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="text-2xl">{user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={user?.name} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email} disabled />
                  <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  )
}

