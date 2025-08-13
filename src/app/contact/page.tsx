"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setStatus("loading")
		const fd = new FormData(e.currentTarget)
		const payload = Object.fromEntries(fd.entries())
		try {
			const res = await fetch("/api/demo", { method: "POST", body: JSON.stringify(payload) })
			if (!res.ok) throw new Error("bad")
			setStatus("success")
		} catch (e) {
			setStatus("error")
		}
	}

	return (
		<div className="container-width py-16">
			<h1 className="text-3xl font-bold mb-6">Contact Sales</h1>
			<form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6 max-w-3xl">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" required />
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" type="email" required />
				</div>
				<div className="md:col-span-2">
					<Label htmlFor="message">Message</Label>
					<Textarea id="message" name="message" rows={5} />
				</div>
				<div className="md:col-span-2 flex items-center gap-4">
					<Button type="submit" disabled={status==="loading"}>{status==="loading"?"Sending...":"Send"}</Button>
					{status==="success" && <span className="text-green-600">Thanks! We will reach out shortly.</span>}
					{status==="error" && <span className="text-red-600">Something went wrong. Please try again.</span>}
				</div>
			</form>
		</div>
	)
} 