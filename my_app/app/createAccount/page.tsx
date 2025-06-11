 "use client"
 import React, { useState } from "react"
 import { supabase } from "@/lib/supabaseClient"
 import { useRouter } from "next/navigation";
 import Link from "next/link";

 
 import { Button } from "@/components/ui/button"
 import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card"
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";




export default function CreateAccount() {
    // ユーザー登録関係
    const router = useRouter();
    const [ email, setEmail] = useState("");
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
   
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        //email, passwordで登録
        const { data,  error } = await supabase.auth.signUp({
            email,
            password,
        });

        //サインアップの際のエラー
        if (error) {
            alert("Sign Up Error");
            return;
        }

        //ユーザー名保持
        const user = data.user;
        if (!user) return;

        
        
        //　プロフィール情報をデータベースに保存
        const { error: profileError} = await supabase.from("profiles").insert([
            {
                username: username,
                user_id: user.id,
                avater_url: null,
                bio: "",
                email: user.email,
            },
        ]);


            //プロフィール作成エラーハンドリング
            if (profileError) {
                alert("Making Profile Error");
            } else {
                alert("Successful Creating Your Account!")
                router.push("/top")
            }
        }
    
    
   
    return(
        <div className="flex justify-center items-center text-center mt-25">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="font-bold">Cyber Intelligence Account</CardTitle>
                    <CardDescription>メールアドレスとパスワードを入力してください</CardDescription>
                </CardHeader>
                <CardAction>
                    <Button variant="link" className="font-bold flex ml-17">
                        <Link href="/login">すでにアカウントをお持ちですか？</Link>
                    </Button>
                </CardAction>
                <CardContent>
            <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Button type="submit" className="w-full">
                            新規作成
                        </Button> 
                        
                    </div>
                </div>
                
                    
            </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardDescription>ー 他のアカウントから続ける ー</CardDescription>
                    <Button variant="outline" className="w-full bg-blue-500">
                    Googleで続ける
                    </Button>
                    <Button variant="outline" className="w-full bg-green-500">
                    LINEで続ける
                    </Button>
                    <Button variant="outline" className="w-full">
                    Apple IDで続ける
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}