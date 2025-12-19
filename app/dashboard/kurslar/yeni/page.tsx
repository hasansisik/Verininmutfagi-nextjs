"use client"

import { useEffect, useState, useCallback } from "react"
import { useAppDispatch } from "@/redux/hook"
import { createCourse, updateCourse, getCourse, uploadImage, uploadVideo } from "@/redux/actions/courseActions"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Upload, ArrowLeft, Save, Image as ImageIcon, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import CategorySelector from "@/components/dashboard/CategorySelector"

interface Lesson {
    lock: boolean
    title: string
    duration: string
    videoUrl: string
}

interface CurriculumSection {
    title: string
    lessons: Lesson[]
}

export default function KursFormPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const courseId = searchParams.get("id")
    const isEdit = !!courseId

    const [uploadingVideo, setUploadingVideo] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        category: "",
        price: 0,
        originalPrice: 0,
        desc: "",
        skill_level: "Başlangıç",
        price_type: "Ücretsiz",
        language: "Türkçe",
        duration: "",
        videoId: "",
        thumb: "",
        isActive: true,
        curriculum: [] as CurriculumSection[],
        overview: {
            description: "",
            whatYouWillLearn: "",
            learningObjectives: [] as string[],
            conclusion: "",
        },
    })

    const loadCourse = useCallback(async () => {
        if (!courseId) return
        try {
            const result = await dispatch(getCourse(courseId)).unwrap()
            setFormData({
                slug: result.slug,
                title: result.title,
                category: result.category._id || result.category,
                price: result.price,
                originalPrice: result.originalPrice,
                desc: result.desc,
                skill_level: result.skill_level,
                price_type: result.price_type,
                language: result.language,
                duration: result.duration,
                videoId: result.videoId,
                thumb: result.thumb || "",
                isActive: result.isActive,
                curriculum: result.curriculum || [],
                overview: result.overview || {
                    description: "",
                    whatYouWillLearn: "",
                    learningObjectives: [],
                    conclusion: "",
                },
            })
        } catch (error) {
            toast.error("Kurs yüklenemedi")
        }
    }, [courseId, dispatch])

    useEffect(() => {
        if (isEdit && courseId) {
            loadCourse()
        }
    }, [isEdit, courseId, loadCourse])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.slug || !formData.category) {
            toast.error("Lütfen zorunlu alanları doldurun")
            return
        }

        setLoading(true)
        try {
            if (isEdit && courseId) {
                await dispatch(updateCourse({ id: courseId, courseData: formData })).unwrap()
                toast.success("Kurs güncellendi")
            } else {
                await dispatch(createCourse(formData)).unwrap()
                toast.success("Kurs oluşturuldu")
            }
            router.push("/dashboard/kurslar")
        } catch (error: any) {
            toast.error(error || "İşlem başarısız")
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingImage(true)
        try {
            const result = await dispatch(uploadImage(file)).unwrap()
            setFormData({ ...formData, thumb: result.imageUrl })
            toast.success("Görsel yüklendi")
        } catch (error) {
            toast.error("Görsel yüklenemedi")
        } finally {
            setUploadingImage(false)
        }
    }

    const handleVideoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        sectionIndex?: number,
        lessonIndex?: number
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingVideo(true)
        try {
            const result = await dispatch(uploadVideo(file)).unwrap()

            if (sectionIndex !== undefined && lessonIndex !== undefined) {
                const newCurriculum = [...formData.curriculum]
                newCurriculum[sectionIndex].lessons[lessonIndex].videoUrl = result.videoUrl
                setFormData({ ...formData, curriculum: newCurriculum })
            } else {
                setFormData({ ...formData, videoId: result.videoUrl })
            }

            toast.success("Video yüklendi")
        } catch (error) {
            toast.error("Video yüklenemedi")
        } finally {
            setUploadingVideo(false)
        }
    }

    // Curriculum functions
    const addSection = () => {
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { title: "", lessons: [] }],
        })
    }

    const removeSection = (index: number) => {
        setFormData({
            ...formData,
            curriculum: formData.curriculum.filter((_, i) => i !== index),
        })
    }

    const updateSection = (index: number, title: string) => {
        const newCurriculum = JSON.parse(JSON.stringify(formData.curriculum))
        newCurriculum[index].title = title
        setFormData({ ...formData, curriculum: newCurriculum })
    }

    const addLesson = (sectionIndex: number) => {
        const newCurriculum = JSON.parse(JSON.stringify(formData.curriculum))
        newCurriculum[sectionIndex].lessons.push({
            lock: false,
            title: "",
            duration: "",
            videoUrl: "",
        })
        setFormData({ ...formData, curriculum: newCurriculum })
    }

    const removeLesson = (sectionIndex: number, lessonIndex: number) => {
        const newCurriculum = JSON.parse(JSON.stringify(formData.curriculum))
        newCurriculum[sectionIndex].lessons = newCurriculum[sectionIndex].lessons.filter(
            (_: any, i: number) => i !== lessonIndex
        )
        setFormData({ ...formData, curriculum: newCurriculum })
    }

    const updateLesson = (
        sectionIndex: number,
        lessonIndex: number,
        field: keyof Lesson,
        value: string | boolean
    ) => {
        const newCurriculum = JSON.parse(JSON.stringify(formData.curriculum))
        newCurriculum[sectionIndex].lessons[lessonIndex] = {
            ...newCurriculum[sectionIndex].lessons[lessonIndex],
            [field]: value,
        }
        setFormData({ ...formData, curriculum: newCurriculum })
    }

    // Learning objectives
    const addObjective = () => {
        setFormData({
            ...formData,
            overview: {
                ...formData.overview,
                learningObjectives: [...formData.overview.learningObjectives, ""],
            },
        })
    }

    const removeObjective = (index: number) => {
        setFormData({
            ...formData,
            overview: {
                ...formData.overview,
                learningObjectives: formData.overview.learningObjectives.filter((_, i) => i !== index),
            },
        })
    }

    const updateObjective = (index: number, value: string) => {
        const newObjectives = [...formData.overview.learningObjectives]
        newObjectives[index] = value
        setFormData({
            ...formData,
            overview: { ...formData.overview, learningObjectives: newObjectives },
        })
    }

    return (
        <div className="flex-1 p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Geri
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? "Kurs Düzenle" : "Yeni Kurs Ekle"}
                        </h1>
                        <p className="text-muted-foreground">
                            Kurs bilgilerini eksiksiz doldurun
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sol Taraf - Ana İçerik */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Temel Bilgiler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Temel Bilgiler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Kurs Başlığı *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Örn: Hayal Gücüyle JavaScript Öğrenmek"
                                        required
                                        className="text-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="hayal-gucuyle-javascript-ogrenmek"
                                        required
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        /kurslar/{formData.slug || "kurs-adi"}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="desc">Kısa Açıklama *</Label>
                                    <Textarea
                                        id="desc"
                                        value={formData.desc}
                                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        placeholder="Kursun kısa açıklaması..."
                                        rows={3}
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Genel Bakış */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Genel Bakış</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Detaylı Açıklama</Label>
                                    <Textarea
                                        value={formData.overview.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                overview: { ...formData.overview, description: e.target.value },
                                            })
                                        }
                                        rows={4}
                                        placeholder="Kursun detaylı açıklaması..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Ne Öğreneceksiniz</Label>
                                    <Textarea
                                        value={formData.overview.whatYouWillLearn}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                overview: { ...formData.overview, whatYouWillLearn: e.target.value },
                                            })
                                        }
                                        rows={4}
                                        placeholder="Bu kursta neler öğreneceksiniz..."
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Öğrenme Hedefleri</Label>
                                        <Button type="button" size="sm" onClick={addObjective} variant="outline">
                                            <Plus className="h-4 w-4 mr-1" />
                                            Ekle
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {formData.overview.learningObjectives.map((obj, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    value={obj}
                                                    onChange={(e) => updateObjective(index, e.target.value)}
                                                    placeholder={`Hedef ${index + 1}`}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeObjective(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Sonuç</Label>
                                    <Textarea
                                        value={formData.overview.conclusion}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                overview: { ...formData.overview, conclusion: e.target.value },
                                            })
                                        }
                                        rows={3}
                                        placeholder="Kurs tamamlandığında..."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Müfredat */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Müfredat</CardTitle>
                                    <Button type="button" onClick={addSection} size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Bölüm Ekle
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {formData.curriculum.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                        Henüz bölüm eklenmedi
                                    </div>
                                ) : (
                                    formData.curriculum.map((section, sectionIndex) => (
                                        <Card key={sectionIndex} className="border-2">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        value={section.title}
                                                        onChange={(e) => updateSection(sectionIndex, e.target.value)}
                                                        placeholder={`Bölüm ${sectionIndex + 1}`}
                                                        className="font-semibold"
                                                    />
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => addLesson(sectionIndex)}
                                                        variant="outline"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeSection(sectionIndex)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                {section.lessons.map((lesson, lessonIndex) => (
                                                    <div
                                                        key={lessonIndex}
                                                        className="flex items-center gap-2 p-3 border rounded-lg"
                                                    >
                                                        <Input
                                                            value={lesson.title}
                                                            onChange={(e) =>
                                                                updateLesson(sectionIndex, lessonIndex, "title", e.target.value)
                                                            }
                                                            placeholder="Ders adı"
                                                            className="flex-1"
                                                        />
                                                        <Input
                                                            value={lesson.duration}
                                                            onChange={(e) =>
                                                                updateLesson(sectionIndex, lessonIndex, "duration", e.target.value)
                                                            }
                                                            placeholder="10:30"
                                                            className="w-24"
                                                        />
                                                        <Input
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={(e) => handleVideoUpload(e, sectionIndex, lessonIndex)}
                                                            className="hidden"
                                                            id={`video-${sectionIndex}-${lessonIndex}`}
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(`video-${sectionIndex}-${lessonIndex}`)
                                                                    ?.click()
                                                            }
                                                            disabled={uploadingVideo}
                                                        >
                                                            <Video className="h-4 w-4" />
                                                        </Button>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={lesson.lock}
                                                                onCheckedChange={(checked) =>
                                                                    updateLesson(sectionIndex, lessonIndex, "lock", checked)
                                                                }
                                                            />
                                                            <Label className="text-xs">Kilitli</Label>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeLesson(sectionIndex, lessonIndex)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sağ Taraf - Sidebar */}
                    <div className="space-y-6">
                        {/* Yayınla */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Yayınla</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="isActive">Durum</Label>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="isActive"
                                            checked={formData.isActive}
                                            onCheckedChange={(checked) =>
                                                setFormData({ ...formData, isActive: checked })
                                            }
                                        />
                                        <Badge variant={formData.isActive ? "default" : "secondary"}>
                                            {formData.isActive ? "Aktif" : "Taslak"}
                                        </Badge>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {loading ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Yayınla"}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Kapak Görseli */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Kapak Görseli</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {formData.thumb ? (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                        <Image
                                            src={formData.thumb}
                                            alt="Kapak görseli"
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={() => setFormData({ ...formData, thumb: "" })}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Kapak görseli yükleyin
                                        </p>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="thumb-upload"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById("thumb-upload")?.click()}
                                            disabled={uploadingImage}
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            {uploadingImage ? "Yükleniyor..." : "Görsel Seç"}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Kategori */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Kategori</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CategorySelector
                                    value={formData.category}
                                    onValueChange={(value: string) => setFormData({ ...formData, category: value })}
                                />
                            </CardContent>
                        </Card>

                        {/* Kurs Ayarları */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Kurs Ayarları</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Seviye</Label>
                                    <Select
                                        value={formData.skill_level}
                                        onValueChange={(value) => setFormData({ ...formData, skill_level: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                                            <SelectItem value="Orta">Orta</SelectItem>
                                            <SelectItem value="İleri">İleri</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Fiyat Tipi</Label>
                                    <Select
                                        value={formData.price_type}
                                        onValueChange={(value) => setFormData({ ...formData, price_type: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ücretsiz">Ücretsiz</SelectItem>
                                            <SelectItem value="Ücretli">Ücretli</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {formData.price_type === "Ücretli" && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Fiyat (₺)</Label>
                                            <Input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Orijinal Fiyat (₺)</Label>
                                            <Input
                                                type="number"
                                                value={formData.originalPrice}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        originalPrice: parseFloat(e.target.value) || 0,
                                                    })
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <Label>Süre</Label>
                                    <Input
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="10sa 30dk"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tanıtım Videosu */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Tanıtım Videosu</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Video URL/ID</Label>
                                    <Input
                                        value={formData.videoId}
                                        onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                                        placeholder="YouTube ID"
                                    />
                                </div>
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleVideoUpload(e)}
                                    className="hidden"
                                    id="main-video"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => document.getElementById("main-video")?.click()}
                                    disabled={uploadingVideo}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    {uploadingVideo ? "Yükleniyor..." : "Video Yükle"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    )
}
