"use client"

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
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



export default function Login() {
    const router = useRouter();
    const [ identifier, setIdentifier ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        
        let email = '';

        //identifierがユーザ名かメールアドレスかを判定
        if (identifier.includes('@')) {
            //メールアドレスとして使用
            email = identifier;
        } else {
            //　ユーザ名としてデータベースからメールを取得
            const { data,  error: fetchError } = await supabase.from('profiles').select('email').eq('username', identifier).single();

            if ( fetchError || !data.email) {
                setError('Something wrong!');
                return;
            }

            email = data.email;
        }

        //supabase Authでログイン
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            setError('invalid credentials');
            console.error(signInError);
            return;
        }

        router.push('/top')
    };



    return(
        <div className="flex justify-center items-center mt-51">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="font-bold">ログイン</CardTitle>
                    <CardAction>
                    <Button variant="link" className="font-bold">
                        <Link href="/createAccount">新規作成</Link>
                    </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                            <Label htmlFor="email">Email or Username</Label>
                            <Input
                                type="text"
                                placeholder="m@example.com or xxxxxx"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                            </div>
                            <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                パスワードを忘れてしまった場合
                                </a>
                            </div>
                                <Input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Button type="submit" className="w-full">
                                    ログイン
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardDescription>ー 別のアカウントでログイン ー</CardDescription>
                    <Button variant="outline" className="w-full bg-blue-500">
                    Googleでログイン
                    </Button>
                    <Button variant="outline" className="w-full bg-green-500">
                    LINEでログイン
                    </Button>
                    <Button variant="outline" className="w-full">
                    Apple IDでログイン
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}