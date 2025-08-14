"use client"

import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
	const { data: session } = useSession()
	const user = session?.user

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<div className="section-padding py-10">
				<div className="container-width max-w-3xl">
					<h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">Account</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center gap-4">
								<Avatar className="h-12 w-12">
									<AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium text-gray-900">{user?.name ?? "User"}</p>
									<p className="text-sm text-gray-600">{user?.email ?? ""}</p>
								</div>
							</div>
							<div className="flex gap-3">
								<Button variant="outline" onClick={() => history.back()}>Back</Button>
								<Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 