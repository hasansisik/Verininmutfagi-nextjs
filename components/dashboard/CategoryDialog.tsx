"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IconPicker } from "@/components/common/IconPicker"

interface CategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: any) => Promise<void>
    initialData?: {
        slug: string
        name: string
        icon: string
        description: string
    } | null
    mode: "create" | "edit"
}

export function CategoryDialog({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    mode
}: CategoryDialogProps) {
    const [formData, setFormData] = useState({
        slug: "",
        name: "",
        icon: "",
        description: "",
    })

    useEffect(() => {
        if (open) {
            if (initialData && mode === "edit") {
                setFormData({
                    slug: initialData.slug,
                    name: initialData.name,
                    icon: initialData.icon,
                    description: initialData.description,
                })
            } else {
                setFormData({
                    slug: "",
                    name: "",
                    icon: "",
                    description: "",
                })
            }
        }
    }, [open, initialData, mode])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit(formData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Kategori Düzenle" : "Yeni Kategori Oluştur"}
                    </DialogTitle>
                    <DialogDescription>
                        Kategori bilgilerini girin. İkonu listeden seçin.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Kategori Adı *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Örn: Geliştirme"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="Örn: gelistirme"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="icon">İkon *</Label>
                            <IconPicker
                                value={formData.icon}
                                onChange={(icon) => setFormData({ ...formData, icon })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Açıklama</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Kategori açıklaması"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            İptal
                        </Button>
                        <Button type="submit">
                            {mode === "edit" ? "Güncelle" : "Oluştur"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
