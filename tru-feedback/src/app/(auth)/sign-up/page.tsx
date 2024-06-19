"use client"
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link'
import {  useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios, { AxiosError } from 'axios'
import { apiResponse } from '@/types/apiResponse'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
const page = () => {
  const [username, setUsername] = useState(''); 
   const [usernameMessage, setUsernameMessage] = useState('') 
   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
     const [isSubmitting, setIsSubmitting] = useState(false);
 
  const debounced = useDebounceCallback(setUsername, 500);

  const { toast } = useToast();
  const router = useRouter();
  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const checkUsername = async () => {
      if (username) { 
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
           
          const response = await axios.get(`/api/check-username?username=${username}`)
          setUsernameMessage(  response?.data?.message)
        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>;
            setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")

        } finally {
          setIsCheckingUsername(false)
        }
      } 
    }
    checkUsername();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<apiResponse>(`/api/sign-up`, data);
      toast({
        title: 'Success',
        description: response?.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false);
    } catch (error) {
      console.log('Error in submitting of user');
      const axiosError = error as AxiosError<apiResponse>
      let errorMessage = axiosError?.response?.data.message
      toast({
        title: 'Sign Up failed',
        description: errorMessage,
        variant: "destructive"
      })
      setIsSubmitting(false);
    }
  }


  return (
<div className='flex justify-center items-center min-h-screen bg-gray-100'>
<div className='w-full max-w-xl p-8 space-y-8 bg-white rounded-lg shadow-md'>
  <div className="text-center">
    <h1 className="text-4xl font-extrabold tracking-tight mb-6 lg:text-5xl leading-loose">Join Tru-Feedback</h1>
    <p className="mb-4">SignUp to start your anonymous adventure</p>
  </div>
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="eg: xyz"
                 {...field} 
                 onChange={(e)=>{field.onChange(e)
                  debounced(e.target.value)
                 }
                } />
              </FormControl>
              {
                isCheckingUsername && <Loader2 className='animate-spin'/>
              }
              <p className={`text-sm ${usernameMessage==="Username is avalible" ? 'text-green-500' : 'text-red-500'}`}>
{usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="eg  : xyz@gmail.com"  {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type='password'
                 {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}  
        />
        <Button className='w-full' type="submit" disabled={isSubmitting}>{isSubmitting ? <>
        <Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait
        </> : 'SignUp'}</Button>  
</form>
</Form>
<div className='text-4 mt-4 text-center'>
<p>Already a member? <Link href='/sign-in' className='text-blue-600 hover:text-blue-600'>Sign in</Link></p>
</div>
</div>
</div>

  )
}

export default page
