
"use client";
import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import {LayoutDashboard, Shield, UserCircle} from 'lucide-react'
import {Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
// _components/Sidebar.jsx
const Sidebar = () => {
 const pathname = usePathname() 
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
}
,
{
  name: "Profile",
  icon: UserCircle,
  path:'/dashboard/profile'
}

]





  return <div className='h-screen shadow-md p-3'> 
<div  className='flex gap-2 items-center p-5'>  
    {/* <Image src={'public/logo.svg'} alt="logo" width={40} height={40}/> */}

<img src="/logo.svg" alt="logo" width={40} height={40}/>
<h2 className='font-bold text-2xl'>Easy Study</h2>
</div>


<div className='mt-10'>
<Link href={'/create'}>
  <Button className="w-full"> +Create New</Button>
  </Link>
</div>

<div>

{MenuList.map((menu, index) => (
  <Link href={menu.path} key={index}>

  <div className={`flex items-center mt-3 rounded-lg gap-2 p-2 hover:bg-gray-100 cursor-pointer
    ${pathname===menu.path&&'bg-slate-200'}
  `}>
    <menu.icon className="w-5 h-5" />
    <h2>{menu.name}</h2>
  </div>
  </Link>
))} 

</div>

<div className='border p-5 bg-slate-100 rounded-lg absolute bottom-10 w-[90%] '>
  <h2 className='text-lg mb-2'>Available Credits : 5 </h2>
  <Progress value={30}/>
  <h2 className='text-sm'>1 out of 5 Credits used</h2>

  <Link href={"/dashboard/upgrade"} className='text-blue-700 text-xs'>Upgrade to create more</Link>
</div>

    </div>;
};

export default Sidebar;



