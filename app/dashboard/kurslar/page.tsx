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
import { Plus, Pencil, Trash2, Search, X, Filter } from "lucide-react"
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
import { SimplePagination } from "@/components/common/SimplePagination"

const ITEMS_PER_PAGE = 8

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
    const [currentPage, setCurrentPage] = useState(1)

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
        setCurrentPage(1)
    }

    // Filter courses
    const filteredCourses = (courses || []).filter((course: any) => {
        const titleMatch = course.title?.toLowerCase().includes(searchTerm.toLowerCase())
        const descMatch = course.desc?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSearch = titleMatch || descMatch

        const matchesCategory = selectedCategory === "all" || course.category?._id === selectedCategory
        const matchesLevel = selectedLevel === "all" || course.skill_level === selectedLevel
        const matchesPriceType = selectedPriceType === "all" || course.price_type === selectedPriceType
        const matchesStatus = selectedStatus === "all" ||
            (selectedStatus === "active" && course.isActive) ||
            (selectedStatus === "inactive" && !course.isActive)

        return matchesSearch && matchesCategory && matchesLevel && matchesPriceType && matchesStatus
    })

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const hasActiveFilters = selectedCategory !== "all" || selectedLevel !== "all" ||
        selectedPriceType !== "all" || selectedStatus !== "all" || searchTerm !== ""

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Kurs Yönetimi</h2>
                    <p className="text-muted-foreground mt-1">
                        Toplam {courses.length} kurstan {filteredCourses.length} tanesi gösteriliyor
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/dashboard/kurslar/yeni")}
                    className="bg-black text-white hover:bg-black/90 shadow-sm rounded-xl"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kurs Oluştur
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <Input
                            placeholder="Kurs adı veya açıklama ile ara..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="pl-9 h-11 bg-white border-gray-200 focus:ring-1 focus:ring-gray-200 transition-all shadow-sm rounded-xl"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-white p-1 px-3 rounded-xl border border-gray-200 shadow-sm">
                        <Filter className="h-4 w-4 text-muted-foreground" />

                        <Select value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v); setCurrentPage(1); }}>
                            <SelectTrigger className="w-[140px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                                {categories.map((cat: any) => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="w-[1px] h-4 bg-gray-300" />

                        <Select value={selectedLevel} onValueChange={(v) => { setSelectedLevel(v); setCurrentPage(1); }}>
                            <SelectTrigger className="w-[110px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                <SelectValue placeholder="Seviye" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Seviyeler</SelectItem>
                                <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                                <SelectItem value="Orta">Orta</SelectItem>
                                <SelectItem value="İleri">İleri</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="w-[1px] h-4 bg-gray-300" />

                        <Select value={selectedPriceType} onValueChange={(v) => { setSelectedPriceType(v); setCurrentPage(1); }}>
                            <SelectTrigger className="w-[110px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                <SelectValue placeholder="Fiyat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Fiyatlar</SelectItem>
                                <SelectItem value="Ücretsiz">Ücretsiz</SelectItem>
                                <SelectItem value="Ücretli">Ücretli</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="w-[1px] h-4 bg-gray-300" />

                        <Select value={selectedStatus} onValueChange={(v) => { setSelectedStatus(v); setCurrentPage(1); }}>
                            <SelectTrigger className="w-[110px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                <SelectValue placeholder="Durum" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Durumlar</SelectItem>
                                <SelectItem value="active">Aktif</SelectItem>
                                <SelectItem value="inactive">Pasif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="h-11 px-4 text-muted-foreground hover:text-red-500 hover:bg-red-50/50 transition-all rounded-xl"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Filtreleri Temizle
                        </Button>
                    )}
                </div>
            </div>

            <div className="overflow-hidden bg-transparent">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-gray-100">
                            <TableHead className="w-[80px] font-semibold text-foreground/80">Görsel</TableHead>
                            <TableHead className="font-semibold text-foreground/80 text-nowrap">Kurs Bilgisi</TableHead>
                            <TableHead className="font-semibold text-foreground/80 text-nowrap">Kategori</TableHead>
                            <TableHead className="font-semibold text-foreground/80 text-nowrap">Seviye</TableHead>
                            <TableHead className="font-semibold text-foreground/80 text-nowrap">Fiyat</TableHead>
                            <TableHead className="font-semibold text-foreground/80 text-nowrap">Durum</TableHead>
                            <TableHead className="text-right font-semibold text-foreground/80 text-nowrap">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
                                        <span className="text-sm text-muted-foreground">Yükleniyor...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : paginatedCourses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Search className="h-10 w-10 opacity-20" />
                                        <span>Filtrelere uygun kurs bulunamadı</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedCourses.map((course: any) => (
                                <TableRow key={course._id} className="hover:bg-gray-50/50 transition-all border-b border-gray-100 last:border-0 group">
                                    <TableCell>
                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            {course.thumb ? (
                                                <Image src={course.thumb} alt={course.title} fill className="object-cover transition-transform group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] text-center p-1">Görsel Yok</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[350px]">
                                        <div className="font-semibold text-foreground line-clamp-1">{course.title}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{course.curriculum?.length || 0} Bölüm • {course.totalLessons || 0} Ders</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {course.category?.icon && <span className="text-sm">{course.category.icon}</span>}
                                            <span className="text-sm">{course.category?.name || "Belirlenmedi"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 rounded-lg font-medium">{course.skill_level}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {course.price_type === "Ücretsiz" ? (
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-lg">Ücretsiz</Badge>
                                        ) : (
                                            <span className="font-semibold text-foreground">₺{course.price}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Switch
                                                checked={course.isActive}
                                                onCheckedChange={() => handleStatusToggle(course)}
                                                className="data-[state=checked]:bg-green-500 scale-90"
                                            />
                                            <span className={`text-[11px] font-medium ${course.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                                {course.isActive ? "AKTİF" : "PASİF"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.push(`/dashboard/kurslar/yeni?id=${course._id}`)}
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-white hover:shadow-sm"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                                                        <AlertDialogDescription>Bu kurs kalıcı olarak silinecektir. Bu işlem geri alınamaz.</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="rounded-xl">İptal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(course._id)} className="bg-red-600 hover:bg-red-700 rounded-xl">Sil</AlertDialogAction>
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

            {totalPages > 1 && (
                <SimplePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}
