"use client";

import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import axios from "axios";

import { useRouter } from "next/navigation";



export default function UpgradePage() {
const router = useRouter();
const CheckoutClick= async()=>
{
  const result  =await axios.post('/api/payment/checkout',{
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
  });
  console.log(result.data)
  
  router.push(result.data.session.url);
  //window.open(result.data.url)
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 flex flex-col items-center">
      
      {/* Heading */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Upgrade Your Plan
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Unlock premium features and level up your learning experience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">

        {/* Free Plan Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">Free Plan</h2>
          <p className="text-gray-500 mt-1">Basic features for students</p>

          <h3 className="text-4xl font-bold mt-4">₹0</h3>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" /> Access study material
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" /> Basic flashcards
            </li>
            <li className="flex items-center gap-2 opacity-50">
              <Check className="w-5 h-5" /> Quizzes (Limited)
            </li>
            <li className="flex items-center gap-2 opacity-50">
              <Check className="w-5 h-5" /> No AI explanations
            </li>
          </ul>

          <Button 
            variant="outline" 
            className="w-full mt-6 rounded-xl py-5"
          >
            Current Plan
          </Button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 border-2 border-blue-600">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Premium</h2>
          </div>

          <p className="text-gray-500 mt-1">Unlock everything</p>

          <h3 className="text-4xl font-bold mt-4">₹299  
            <span className="text-sm text-gray-500"> / month</span>
          </h3>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" /> Unlimited flashcards
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" /> All quizzes unlocked
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" /> AI explanations & answers
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" /> Priority access to new features
            </li>
          </ul>

          <Button 
          onClick={CheckoutClick}
            className="w-full mt-6 rounded-xl py-5 text-lg"
          >
            Upgrade Now
          </Button>
        </div>

      </div>

      {/* Footer */}
      <p className="mt-10 text-gray-400 text-sm">
        Cancel anytime · No hidden charges
      </p>
    </div>
  );
}
