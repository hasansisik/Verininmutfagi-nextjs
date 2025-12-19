"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "@/redux/actions/categoryActions"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Category {
    _id: string
    slug: string
    name: string
    icon: string
    description: string
    courseCount: number
    isActive: boolean
    createdAt: string
}

export default function KategorilerPage() {
    const dispatch = useAppDispatch()
    const { categories, loading } = useAppSelector((state) => state.categoryManagement)

    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState({
        slug: "",
        name: "",
        icon: "",
        description: "",
        courseCount: 0,
    })

    useEffect(() => {
        dispatch(getAllCategories({}))
    }, [dispatch])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.slug || !formData.icon) {
            toast.error("Lütfen tüm zorunlu alanları doldurun")
            return
        }

        try {
            if (selectedCategory) {
                // Update
                await dispatch(updateCategory({
                    id: selectedCategory._id,
                    categoryData: formData
                })).unwrap()
                toast.success("Kategori güncellendi")
            } else {
                // Create
                await dispatch(createCategory(formData)).unwrap()
                toast.success("Kategori oluşturuldu")
            }

            setDialogOpen(false)
            resetForm()
            dispatch(getAllCategories({}))
        } catch (error: any) {
            toast.error(error || "İşlem başarısız")
        }
    }

    const handleDelete = async () => {
        if (!selectedCategory) return

        try {
            await dispatch(deleteCategory(selectedCategory._id)).unwrap()
            toast.success("Kategori silindi")
            setDeleteDialogOpen(false)
            setSelectedCategory(null)
            dispatch(getAllCategories({}))
        } catch (error: any) {
            toast.error(error || "Silme işlemi başarısız")
        }
    }

    const openEditDialog = (category: Category) => {
        setSelectedCategory(category)
        setFormData({
            slug: category.slug,
            name: category.name,
            icon: category.icon,
            description: category.description,
            courseCount: category.courseCount,
        })
        setDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedCategory(null)
        resetForm()
        setDialogOpen(true)
    }

    const resetForm = () => {
        setFormData({
            slug: "",
            name: "",
            icon: "",
            description: "",
            courseCount: 0,
        })
        setSelectedCategory(null)
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kategori Yönetimi</h2>
                    <p className="text-muted-foreground">
                        Kurs kategorilerini görüntüleyin ve yönetin
                    </p>
                </div>
                <Button onClick={openCreateDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kategori
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Kategoriler</CardTitle>
                    <CardDescription>
                        Toplam {categories.length} kategori
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>İkon</TableHead>
                                    <TableHead>Kategori Adı</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Açıklama</TableHead>
                                    <TableHead>Kurs Sayısı</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Yükleniyor...
                                        </TableCell>
                                    </TableRow>
                                ) : categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Kategori bulunamadı
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.map((category) => (
                                        <TableRow key={category._id}>
                                            <TableCell>
                                                <Tag className="h-5 w-5" />
                                            </TableCell>
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell>
                                                <code className="text-sm bg-muted px-2 py-1 rounded">
                                                    {category.slug}
                                                </code>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {category.description}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{category.courseCount}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {category.isActive ? (
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                        Pasif
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditDialog(category)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedCategory(category)
                                                            setDeleteDialogOpen(true)
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedCategory ? "Kategori Düzenle" : "Yeni Kategori Oluştur"}
                        </DialogTitle>
                        <DialogDescription>
                            Kategori bilgilerini girin. Lucide-react ikon isimlerini kullanın.
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
                                <Label htmlFor="icon">İkon (Lucide-react) *</Label>
                                <Input
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="Örn: Code2, Palette, Database"
                                    required
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
                            <div className="grid gap-2">
                                <Label htmlFor="courseCount">Kurs Sayısı</Label>
                                <Input
                                    id="courseCount"
                                    type="number"
                                    value={formData.courseCount}
                                    onChange={(e) => setFormData({ ...formData, courseCount: parseInt(e.target.value) || 0 })}
                                    min="0"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                İptal
                            </Button>
                            <Button type="submit">
                                {selectedCategory ? "Güncelle" : "Oluştur"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu kategori kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Sil
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
