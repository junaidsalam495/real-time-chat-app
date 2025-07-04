import { MessageCircle, Users, Zap } from 'lucide-react'
import React from 'react'

const AppPreviewSection = () => {
    return (
        <>
            <section className="bg-muted py-16">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter">Experience the best chat interface</h2>
                            <p className="text-muted-foreground">
                                Our WhatsApp-inspired interface makes chatting with friends intuitive and enjoyable. With dark mode
                                support and a clean design, you'll love using ChatApp every day.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span>See all your contacts in one place</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5 text-primary" />
                                    <span>Seamless messaging experience</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" />
                                    <span>Lightning-fast message delivery</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 border rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/placeholder.svg?height=600&width=800"
                                alt="ChatApp Interface Preview"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AppPreviewSection


