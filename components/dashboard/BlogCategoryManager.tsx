"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import {
    getAllBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
} from "@/redux/actions/blogCategoryActions"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, X, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface BlogCategoryManagerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect?: (categoryName: string) => void
}

export default function BlogCategoryManager({ open, onOpenChange, onSelect }: BlogCategoryManagerProps) {
    const dispatch = useAppDispatch()
    const { categories, loading } = useAppSelector((state) => state.blogCategoryManagement)

    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        isActive: true
    })

    useEffect(() => {
        if (open) {
            dispatch(getAllBlogCategories({}))
        }
    }, [open, dispatch])

    const generateSlug = (name: string) => {
        const turkishMap: { [key: string]: string } = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
            'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
        }

        return name
            .split('')
            .map(char => turkishMap[char] || char)
            .join('')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: editingId ? formData.slug : generateSlug(name)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log('📝 Form submitted:', formData)

        if (!formData.name || !formData.slug) {
            toast.error("Kategori adı ve slug gereklidir")
            return
        }

        try {
            console.log('🚀 Dispatching create/update...', { editingId, formData })
            if (editingId) {
                const result = await dispatch(updateBlogCategory({ id: editingId, ...formData })).unwrap()
                console.log('✅ Update result:', result)
                toast.success("Kategori güncellendi")
            } else {
                const result = await dispatch(createBlogCategory(formData)).unwrap()
                console.log('✅ Create result:', result)
                toast.success("Kategori oluşturuldu")
            }
            resetForm()
            dispatch(getAllBlogCategories({}))
        } catch (error: any) {
            console.error('❌ Error:', error)
            toast.error(error || "İşlem başarısız")
        }
    }

    const handleEdit = (category: any) => {
        setEditingId(category._id)
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            isActive: category.isActive
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) return

        try {
            await dispatch(deleteBlogCategory(id)).unwrap()
            toast.success("Kategori silindi")
            dispatch(getAllBlogCategories({}))
        } catch (error: any) {
            toast.error(error || "Kategori silinemedi")
        }
    }

    const resetForm = () => {
        setEditingId(null)
        setFormData({
            name: "",
            slug: "",
            description: "",
            isActive: true
        })
    }

    const handleSelectCategory = (categoryName: string) => {
        if (onSelect) {
            onSelect(categoryName)
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Blog Kategorileri Yönetimi</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Kategori Adı *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="Örn: Veri Bilimi"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug *</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="veri-bilimi"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Açıklama</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Kategori açıklaması (opsiyonel)"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                />
                                <Label htmlFor="isActive">Aktif</Label>
                            </div>

                            <div className="flex gap-2">
                                {editingId && (
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="h-4 w-4 mr-2" />
                                        İptal
                                    </Button>
                                )}
                                <Button type="submit" disabled={loading}>
                                    {editingId ? (
                                        <>
                                            <Check className="h-4 w-4 mr-2" />
                                            Güncelle
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Ekle
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kategori Adı</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading && categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Yükleniyor...
                                        </TableCell>
                                    </TableRow>
                                ) : categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Henüz kategori eklenmedi
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.map((category: any) => (
                                        <TableRow
                                            key={category._id}
                                            className={onSelect ? "cursor-pointer hover:bg-gray-50" : ""}
                                            onClick={() => onSelect && handleSelectCategory(category.name)}
                                        >
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {category.isActive ? 'Aktif' : 'Pasif'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleEdit(category)
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleDelete(category._id)
                                                        }}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
