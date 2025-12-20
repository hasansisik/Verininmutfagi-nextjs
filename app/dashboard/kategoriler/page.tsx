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
import { Plus, Pencil, Trash2, Tag, Search, X, Filter } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SimplePagination } from "@/components/common/SimplePagination"
import { CategoryDialog } from "@/components/dashboard/CategoryDialog"

const ITEMS_PER_PAGE = 8

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
    const categoryState = useAppSelector((state) => state.categoryManagement)
    const categories = categoryState?.categories || []
    const loading = categoryState?.loading

    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)

    // Derived state for dialog mode
    const dialogMode = selectedCategory ? "edit" : "create"

    const filteredCategories = categories?.filter((category) => {
        const matchesSearch =
            category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" ||
            (statusFilter === "active" ? category.isActive : !category.isActive)

        return matchesSearch && matchesStatus
    }) || []

    const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const clearFilters = () => {
        setSearchTerm("")
        setStatusFilter("all")
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getAllCategories({}))
    }, [dispatch])

    const handleSubmit = async (formData: any) => {
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
            setSelectedCategory(null)
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
        setDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedCategory(null)
        setDialogOpen(true)
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

            <Card className="border-none shadow-none bg-transparent">
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <CardTitle>Kategoriler</CardTitle>
                            <CardDescription>
                                Toplam {filteredCategories.length} kategori bulundu
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <Input
                                placeholder="Kategori adı, slug veya açıklama ile ara..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="pl-9 h-11 bg-white border-gray-200 focus:ring-1 focus:ring-gray-200 transition-all shadow-sm rounded-xl"
                            />
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-2 bg-white p-1 px-3 rounded-xl border border-gray-200 focus-within:ring-1 focus-within:ring-gray-200 transition-all shadow-sm">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                                    <SelectTrigger className="w-[130px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                        <SelectValue placeholder="Durum Seç" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tüm Durumlar</SelectItem>
                                        <SelectItem value="active">Aktif</SelectItem>
                                        <SelectItem value="inactive">Pasif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(searchTerm || statusFilter !== "all") && (
                                <Button
                                    variant="ghost"
                                    onClick={clearFilters}
                                    className="h-11 px-4 text-muted-foreground hover:text-red-500 hover:bg-red-50/50 transition-all rounded-xl"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Temizle
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold text-foreground/80">İkon</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Kategori Adı</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Slug</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Açıklama</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Kurs Sayısı</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Durum</TableHead>
                                    <TableHead className="text-right font-semibold text-foreground/80">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Yükleniyor...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Kategori bulunamadı
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedCategories.map((category) => {
                                        // Safely access icon from Lucide
                                        // Use 'any' cast to avoid TS indexing errors
                                        const IconComponent = (LucideIcons as any)[category.icon] || Tag;
                                        return (
                                            <TableRow key={category._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
                                                <TableCell>
                                                    <IconComponent className="h-5 w-5 text-muted-foreground" />
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
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <SimplePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </CardContent>
            </Card>

            <CategoryDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                initialData={selectedCategory}
                mode={dialogMode}
            />

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
