"use client"

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null)
    const quillRef = useRef<any>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && editorRef.current && !quillRef.current) {
            import('react-quill').then((ReactQuill) => {
                // Import Quill CSS globally in your app (e.g., in _app.tsx or layout.tsx)
                // import 'quill/dist/quill.snow.css'

                const Quill = ReactQuill.default

                if (editorRef.current) {
                    const quillInstance = new Quill.Quill(editorRef.current, {
                        theme: 'snow',
                        placeholder: placeholder || 'Enter description...',
                        modules: {
                            toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['blockquote', 'code-block'],
                                ['link'],
                                ['clean']
                            ],
                        },
                    })

                    quillInstance.on('text-change', () => {
                        const content = quillInstance.root.innerHTML
                        onChange(content)
                    })

                    if (value) {
                        quillInstance.root.innerHTML = value
                    }

                    quillRef.current = quillInstance
                }
            })
        }
    }, [])

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value
        }
    }, [value])

    return (
        <div className={cn("bg-white border border-gray-300 rounded-md", className)}>
            <div ref={editorRef} style={{ minHeight: '150px' }} />
        </div>
    )
}