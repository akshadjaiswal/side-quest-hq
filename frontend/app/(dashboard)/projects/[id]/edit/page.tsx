'use client'

import { useProject, useUpdateProject } from '@/hooks/use-projects'
import { ProjectForm } from '@/components/projects/project-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ProjectFormData } from '@/lib/validations/project-schema'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const { data: project, isLoading } = useProject(projectId)
  const updateProject = useUpdateProject()

  const handleSubmit = async (data: ProjectFormData) => {
    await updateProject.mutateAsync({ id: projectId, data })
    router.push(`/projects/${projectId}`)
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">💀</div>
          <p className="text-foreground-tertiary">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Project not found</h2>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href={`/projects/${projectId}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Project</h1>
          <p className="text-foreground-tertiary">Update details for "{project.name}"</p>
        </div>

        {/* Form */}
        <div className="bg-background-secondary border border-border rounded-lg p-8">
          <ProjectForm
            defaultValues={project}
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/projects/${projectId}`)}
            isSubmitting={updateProject.isPending}
          />
        </div>
      </div>
    </div>
  )
}
