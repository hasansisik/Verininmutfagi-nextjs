"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux/hook';
import { rateCourse } from '@/redux/actions/courseActions';
import { loadUser } from '@/redux/actions/userActions';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string;
    courseTitle: string;
}

const RatingModal = ({ isOpen, onClose, courseId, courseTitle }: RatingModalProps) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Lütfen bir puan verin");
            return;
        }

        setIsSubmitting(true);
        try {
            await dispatch(rateCourse({ courseId, rating })).unwrap();
            toast.success("Değerlendirmeniz için teşekkürler!");
            dispatch(loadUser());
            onClose();
        } catch (error: any) {
            toast.error(error || "Değerlendirme gönderilemedi");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h4 className="mb-10" style={{ fontWeight: '700' }}>Kursu Değerlendir</h4>
                <p className="mb-20" style={{ fontSize: '14px', color: '#6B7280' }}>"{courseTitle}" kursunu nasıl buldunuz?</p>

                <div className="star-rating mb-30" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '32px',
                                color: (hover || rating) >= star ? '#FFB21D' : '#D1D5DB',
                                transition: 'color 0.2s'
                            }}
                        >
                            <i className="fas fa-star"></i>
                        </button>
                    ))}
                </div>

                <div className="d-flex gap-2 justify-content-center">
                    <button
                        onClick={onClose}
                        className="btn"
                        style={{ background: '#F3F4F6', color: '#1F2937', padding: '10px 20px', border: 'none' }}
                    >
                        Vazgeç
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn"
                        style={{ padding: '10px 20px' }}
                    >
                        {isSubmitting ? "Gönderiliyor..." : "Puanla"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;
