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
 import Link from "next/link";



export default function createAccount() {
    return(
        <div className="flex justify-center items-center text-center mt-51">
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
                    <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password" required />
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                      新規作成
                    </Button>
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