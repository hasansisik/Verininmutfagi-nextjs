"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllCourses, deleteCourse, updateCourse } from "@/redux/actions/courseActions"
import { getAllCategories } from "@/redux/actions/categoryActions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, Search, X } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function KurslarPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { courses, loading } = useAppSelector((state) => state.courseManagement)
    const { categories } = useAppSelector((state) => state.categoryManagement)

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedLevel, setSelectedLevel] = useState<string>("all")
    const [selectedPriceType, setSelectedPriceType] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")

    useEffect(() => {
        dispatch(getAllCourses({}))
        dispatch(getAllCategories({ isActive: true }))
    }, [dispatch])

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteCourse(id)).unwrap()
            toast.success("Kurs silindi")
            dispatch(getAllCourses({}))
        } catch (error: any) {
            toast.error(error || "Silme başarısız")
        }
    }

    const handleStatusToggle = async (course: any) => {
        try {
            await dispatch(updateCourse({
                id: course._id,
                courseData: { isActive: !course.isActive }
            })).unwrap()
            toast.success(`Kurs ${!course.isActive ? 'aktif' : 'pasif'} edildi`)
            dispatch(getAllCourses({}))
        } catch (error: any) {
            toast.error(error || "Durum güncellenemedi")
        }
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedCategory("all")
        setSelectedLevel("all")
        setSelectedPriceType("all")
        setSelectedStatus("all")
    }

    // Filter courses
    const filteredCourses = courses.filter((course: any) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.desc?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || course.category?._id === selectedCategory
        const matchesLevel = selectedLevel === "all" || course.skill_level === selectedLevel
        const matchesPriceType = selectedPriceType === "all" || course.price_type === selectedPriceType
        const matchesStatus = selectedStatus === "all" ||
            (selectedStatus === "active" && course.isActive) ||
            (selectedStatus === "inactive" && !course.isActive)

        return matchesSearch && matchesCategory && matchesLevel && matchesPriceType && matchesStatus
    })

    const hasActiveFilters = selectedCategory !== "all" || selectedLevel !== "all" ||
        selectedPriceType !== "all" || selectedStatus !== "all"

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kurs Yönetimi</h2>
                    <p className="text-muted-foreground">
                        {filteredCourses.length} / {courses.length} kurs gösteriliyor
                    </p>
                </div>
                <Button onClick={() => router.push("/dashboard/kurslar/yeni")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kurs
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Kurs adı veya açıklama ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tüm Kategoriler" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Kategoriler</SelectItem>
                            {categories.map((cat: any) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                    {cat.icon} {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Seviye</Label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tüm Seviyeler" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Seviyeler</SelectItem>
                            <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                            <SelectItem value="Orta">Orta</SelectItem>
                            <SelectItem value="İleri">İleri</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Fiyat Tipi</Label>
                    <Select value={selectedPriceType} onValueChange={setSelectedPriceType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tüm Fiyatlar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Fiyatlar</SelectItem>
                            <SelectItem value="Ücretsiz">Ücretsiz</SelectItem>
                            <SelectItem value="Ücretli">Ücretli</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Durum</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tüm Durumlar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Durumlar</SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Pasif</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {hasActiveFilters && (
                    <div className="md:col-span-4 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                            <X className="mr-2 h-4 w-4" />
                            Filtreleri Temizle
                        </Button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Görsel</TableHead>
                            <TableHead>Başlık</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Seviye</TableHead>
                            <TableHead>Müfredat</TableHead>
                            <TableHead>Fiyat</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    Yükleniyor...
                                </TableCell>
                            </TableRow>
                        ) : filteredCourses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    {searchTerm || hasActiveFilters ? "Filtrelere uygun kurs bulunamadı" : "Kurs bulunamadı"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCourses.map((course: any) => (
                                <TableRow key={course._id}>
                                    <TableCell>
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                                            {course.thumb ? (
                                                <Image
                                                    src={course.thumb}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                                    Görsel Yok
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium max-w-[300px]">
                                        <div className="truncate">{course.title}</div>
                                        {course.desc && (
                                            <div className="text-xs text-muted-foreground truncate mt-1">
                                                {course.desc}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {course.category?.icon && (
                                            <span className="mr-1">{course.category.icon}</span>
                                        )}
                                        {course.category?.name || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{course.skill_level}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {course.curriculum?.length || 0} Bölüm
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {course.price_type === "Ücretsiz" ? (
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Ücretsiz
                                            </Badge>
                                        ) : (
                                            <span className="font-medium">₺{course.price}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={course.isActive}
                                                onCheckedChange={() => handleStatusToggle(course)}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                {course.isActive ? "Aktif" : "Pasif"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.push(`/dashboard/kurslar/yeni?id=${course._id}`)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Bu kurs kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>İptal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(course._id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Sil
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
