"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
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

function KursFormContent() {
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

    // Toplam süreyi hesapla
    const calculateTotalDuration = useCallback(() => {
        let totalSeconds = 0;
        formData.curriculum.forEach(section => {
            section.lessons.forEach(lesson => {
                const parts = lesson.duration.split(':').map(Number);
                if (parts.length === 2) {
                    // mm:ss
                    totalSeconds += parts[0] * 60 + parts[1];
                } else if (parts.length === 3) {
                    // hh:mm:ss
                    totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
                }
            });
        });

        if (totalSeconds === 0) return;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        let durationStr = "";
        if (hours > 0) durationStr += `${hours}sa `;
        if (minutes > 0) durationStr += `${minutes}dk `;
        if (seconds > 0 && hours === 0) durationStr += `${seconds}sn`;

        setFormData(prev => ({ ...prev, duration: durationStr.trim() }));
    }, [formData.curriculum]);

    useEffect(() => {
        calculateTotalDuration();
    }, [formData.curriculum, calculateTotalDuration]);

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
                setFormData(prev => {
                    const newCurriculum = JSON.parse(JSON.stringify(prev.curriculum))
                    if (newCurriculum[sectionIndex]?.lessons[lessonIndex]) {
                        newCurriculum[sectionIndex].lessons[lessonIndex].videoUrl = result.videoUrl

                        // Süreyi otomatik doldur (eğer gelmişse ve boşsa)
                        if (result.duration && !newCurriculum[sectionIndex].lessons[lessonIndex].duration) {
                            const totalSeconds = Math.round(result.duration);
                            const mins = Math.floor(totalSeconds / 60);
                            const secs = totalSeconds % 60;
                            newCurriculum[sectionIndex].lessons[lessonIndex].duration =
                                `${mins}:${secs.toString().padStart(2, '0')}`;
                        }
                    }
                    return { ...prev, curriculum: newCurriculum }
                })
            } else {
                setFormData(prev => ({ ...prev, videoId: result.videoUrl }))
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
                                            <CardContent className="space-y-4">
                                                {section.lessons.map((lesson, lessonIndex) => (
                                                    <div key={lessonIndex} className="space-y-3 p-4 border rounded-xl bg-gray-50/30">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-white border rounded-lg p-2 text-xs font-bold text-muted-foreground w-8 h-8 flex items-center justify-center shrink-0">
                                                                {lessonIndex + 1}
                                                            </div>
                                                            <Input
                                                                value={lesson.title}
                                                                onChange={(e) =>
                                                                    updateLesson(sectionIndex, lessonIndex, "title", e.target.value)
                                                                }
                                                                placeholder="Ders adı"
                                                                className="flex-1 bg-white"
                                                            />
                                                            <Input
                                                                value={lesson.duration}
                                                                onChange={(e) =>
                                                                    updateLesson(sectionIndex, lessonIndex, "duration", e.target.value)
                                                                }
                                                                placeholder="mm:ss"
                                                                className="w-24 bg-white"
                                                            />
                                                            <div className="flex items-center gap-2 px-2">
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
                                                                className="text-red-500 hover:bg-red-50"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>

                                                        <div className="flex items-center gap-4 pl-11">
                                                            <Input
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) => handleVideoUpload(e, sectionIndex, lessonIndex)}
                                                                className="hidden"
                                                                id={`video-${sectionIndex}-${lessonIndex}`}
                                                            />

                                                            {lesson.videoUrl ? (
                                                                <div className="flex-1 flex items-center gap-4 bg-white p-3 border rounded-xl shadow-sm">
                                                                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
                                                                        <video
                                                                            src={lesson.videoUrl}
                                                                            className="w-full h-full object-cover"
                                                                            onMouseOver={e => (e.currentTarget as HTMLVideoElement).play()}
                                                                            onMouseOut={e => (e.currentTarget as HTMLVideoElement).pause()}
                                                                            muted
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                            <Button
                                                                                type="button"
                                                                                variant="secondary"
                                                                                size="icon"
                                                                                className="rounded-full w-8 h-8"
                                                                                onClick={() => window.open(lesson.videoUrl, '_blank')}
                                                                            >
                                                                                <Video className="h-3 w-3" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium truncate">Video Yüklendi</p>
                                                                        <p className="text-xs text-muted-foreground truncate opacity-70">
                                                                            {lesson.videoUrl.split('/').pop()}
                                                                        </p>
                                                                        <Button
                                                                            type="button"
                                                                            variant="link"
                                                                            className="h-auto p-0 text-xs text-blue-600"
                                                                            onClick={() => document.getElementById(`video-${sectionIndex}-${lessonIndex}`)?.click()}
                                                                        >
                                                                            Değiştir
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    onClick={() => document.getElementById(`video-${sectionIndex}-${lessonIndex}`)?.click()}
                                                                    className="w-full h-12 border-dashed border-2 hover:border-blue-400 hover:bg-blue-50/50 transition-all rounded-xl"
                                                                    disabled={uploadingVideo}
                                                                >
                                                                    <Video className="h-4 w-4 mr-2" />
                                                                    {uploadingVideo ? "Yükleniyor..." : "Ders Videosu Yükle"}
                                                                </Button>
                                                            )}
                                                        </div>
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
                                    <Label>Toplam Süre</Label>
                                    <Input
                                        value={formData.duration}
                                        readOnly
                                        placeholder="Müfredattan hesaplanır"
                                        className="bg-gray-50 cursor-not-allowed"
                                    />
                                    <p className="text-[10px] text-muted-foreground">
                                        Müfredattaki ders sürelerinden otomatik hesaplanır.
                                    </p>
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
                                        placeholder="YouTube ID veya Video URL"
                                    />
                                </div>
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleVideoUpload(e)}
                                    className="hidden"
                                    id="main-video"
                                />

                                {formData.videoId ? (
                                    <div className="space-y-3">
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-black border group">
                                            {formData.videoId.includes('youtube.com') || formData.videoId.includes('youtu.be') ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${formData.videoId.split('v=')[1]?.split('&')[0] || formData.videoId.split('/').pop()}`}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <video
                                                    src={formData.videoId}
                                                    className="w-full h-full object-cover"
                                                    controls
                                                />
                                            )}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => setFormData({ ...formData, videoId: "" })}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => document.getElementById("main-video")?.click()}
                                            disabled={uploadingVideo}
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Videoyu Değiştir
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full border-dashed border-2 py-8"
                                        onClick={() => document.getElementById("main-video")?.click()}
                                        disabled={uploadingVideo}
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <Video className="h-8 w-8 text-muted-foreground" />
                                            <span>{uploadingVideo ? "Yükleniyor..." : "Tanıtım Videosu Yükle"}</span>
                                        </div>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default function KursFormPage() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <KursFormContent />
        </Suspense>
    )
}
