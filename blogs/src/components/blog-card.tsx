"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'

interface BlogCardProps {
  id: string
  icon: string | null
  cover: string | null
  created_time: string
  title: string
  description: string
  category: string
}

export function BlogCard({ id, icon, cover, created_time, title, description, category }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden bg-gray-900 text-gray-100 border-gray-800 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {cover ? (
            <Image
              src={cover || "/placeholder.svg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-300 ease-in-out"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl">
              {icon || '📄'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
        </div>
        <CardHeader className="relative z-10 -mt-16 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <h2 className="text-2xl font-bold leading-tight text-gray-100">{title}</h2>
          </div>
        </CardHeader>
        <CardContent className="bg-gray-900 flex-grow">
          <p className="text-gray-300 line-clamp-3 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              {category}
            </Badge>
            <div className="flex items-center text-xs text-gray-400">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>{formatDate(created_time)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-900 border-t border-gray-800">
          <Button asChild variant="secondary" className="w-full hover:bg-gray-700">
            <Link href={`/blogs/${id}`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
