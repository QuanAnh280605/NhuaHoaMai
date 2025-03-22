"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Vui lòng nhập địa chỉ email hợp lệ.",
  }),
  phone: z.string().min(10 ,{
    message: "Vui lòng nhập số điện thoại hợp lệ.",
  }),
  subject: z.string().min(5, {
    message: "Chủ đề phải có ít nhất 5 ký tự.",
  }),
  message: z.string().min(10, {
    message: "Nội dung tin nhắn phải có ít nhất 10 ký tự.",
  }),
})

export function ContactForm({ productName = "" }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: productName ? `Yêu cầu về ${productName}` : "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("entry.1289286471", values.name)  // ID của ô nhập "Tên"
      formData.append("entry.1404472568", values.phone) // ID của ô nhập "Số điện thoại"
      formData.append("entry.580021169", values.message) // ID của ô nhập "Nội dung"

      const response = await fetch("https://docs.google.com/forms/d/e/1FAIpQLSe8mEKGaqBzTZB1Qy09NrHBOe1y1EjbC8oi9Bo3PZEFDIksmg/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
      
      setIsSuccess(true)
      form.reset()
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }  
  

  if (isSuccess) {
    return (
      <Alert className="bg-primary/10 border-primary">
        <CheckCircle className="h-4 w-4 text-primary" />
        <AlertTitle>Gửi tin nhắn thành công!</AlertTitle>
        <AlertDescription>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.</AlertDescription>
        <Button variant="outline" className="mt-4" onClick={() => setIsSuccess(false)}>
          Gửi tin nhắn khác
        </Button>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên của bạn" {...field} />
                </FormControl>
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
                  <Input placeholder="nhap.email@vidu.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chủ đề</FormLabel>
              <FormControl>
                <Input placeholder="Bạn muốn liên hệ về vấn đề gì?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung tin nhắn</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hãy cung cấp chi tiết về yêu cầu của bạn..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
        </Button>
      </form>
    </Form>
  )
}
