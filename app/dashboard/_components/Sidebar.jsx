
"use client";
import React, { useEffect, useRef } from 'react'
import Link from "next/link";
import {LayoutDashboard, Shield, UserCircle, Plus, Zap} from 'lucide-react'
import {Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import gsap from 'gsap'

const Sidebar = () => {
  const pathname = usePathname()
  const sidebarRef = useRef(null)
  
  const MenuList=[
    {
      name: 'Dashboard',
      icon : LayoutDashboard,
      path: "/dashboard"
    },
    {
      name: "Upgrade",
      icon: Shield,
      path:'/dashboard/upgrade'
    },
    {
      name: "Profile",
      icon: UserCircle,
      path:'/dashboard/profile'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      )
    }, sidebarRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={sidebarRef}
      className='h-screen bg-card border-r border-border shadow-lg p-6 flex flex-col overflow-hidden sticky top-0'
    > 
      {/* Logo Section */}
      <div className='flex gap-3 items-center p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8'>
        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold'>
          ES
        </div>
        <h2 className='font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          EasyStudy
        </h2>
      </div>

      {/* Create New Button */}
      <Link href={'/create'} className='mb-8'>
        <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Create New
        </Button>
      </Link>

      {/* Menu Items */}
      <nav className='flex-1 space-y-3'>
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group
              ${pathname === menu.path 
                ? 'bg-primary/10 text-primary border border-primary/30' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }
            `}>
              <menu.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <h2 className='font-medium'>{menu.name}</h2>
            </div>
          </Link>
        ))} 
      </nav>

      {/* Credits Section */}
      <div className='border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-5 rounded-2xl space-y-4'>
        <div className='flex items-center gap-2'>
          <Zap className='w-5 h-5 text-primary' />
          <h2 className='text-sm font-semibold text-foreground'>Available Credits</h2>
        </div>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-2xl font-bold text-primary'>5</span>
            <span className='text-xs text-muted-foreground'>credits</span>
          </div>
          <Progress value={20} className='h-2'/>
        </div>
        <p className='text-xs text-muted-foreground'>1 out of 5 used</p>
        <Link 
          href={"/dashboard/upgrade"} 
          className='text-primary text-xs font-semibold hover:underline block'
        >
          Upgrade for more →
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;



