import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const data = await request.json()
		// Basic validation
		if (!data?.email && !data?.name) {
			return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
		}
		// Simulate persistence or MCP call here
		return NextResponse.json({ ok: true })
	} catch (_err) {
		return NextResponse.json({ ok: false }, { status: 400 })
	}
} 