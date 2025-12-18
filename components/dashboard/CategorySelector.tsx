"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllCategories } from "@/redux/actions/categoryActions"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface CategorySelectorProps {
    value: string
    onValueChange: (value: string) => void
}

export default function CategorySelector({ value, onValueChange }: CategorySelectorProps) {
    const dispatch = useAppDispatch()
    const { categories, loading } = useAppSelector((state) => state.categoryManagement)

    useEffect(() => {
        // Kategorileri yükle
        dispatch(getAllCategories({ isActive: true }))
    }, [dispatch])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
                {categories && categories.length > 0 ? (
                    categories.map((category: any) => (
                        <SelectItem key={category._id} value={category._id}>
                            <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </div>
                        </SelectItem>
                    ))
                ) : (
                    <SelectItem value="no-category" disabled>
                        Kategori bulunamadı
                    </SelectItem>
                )}
            </SelectContent>
        </Select>
    )
}
