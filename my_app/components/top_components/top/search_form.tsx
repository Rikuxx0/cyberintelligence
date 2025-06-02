import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Search_form() {
  return (
    <Card>
        <CardContent>
            <div className="flex w-full h-full gap-1">
                <Search className="mt-1.5"/>
                <Input className="w-full px-4 placeholder:text-sm placeholder:align-top border-none outline-none" type="search" placeholder="Search"/>
            </div>
        </CardContent>
    </Card>
  )
}
