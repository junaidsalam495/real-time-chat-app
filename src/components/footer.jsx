import { MessageCircle } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="border-t py-8 bg-background">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <span className="font-semibold">ChatApp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} ChatApp. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer


