'use client'

import { useProject, useDeleteProject } from '@/hooks/use-projects'
import { StatusBadge } from '@/components/projects/status-badge'
import { TechTag } from '@/components/projects/tech-tag'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { formatDate, formatDateRange } from '@/lib/utils/date'
import { Github, ExternalLink, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
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
} from '@/components/ui/alert-dialog'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const { data: project, isLoading } = useProject(projectId)
  const deleteProject = useDeleteProject()

  const handleDelete = async () => {
    await deleteProject.mutateAsync(projectId)
    router.push('/dashboard')
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
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Cover Image */}
        {project.cover_image_url && (
          <div className="h-64 rounded-lg overflow-hidden mb-6">
            <img
              src={project.cover_image_url}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-foreground">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-lg text-foreground-secondary">{project.description}</p>
          </div>

          <div className="flex gap-2">
            <Link href={`/projects/${project.id}/edit`}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{project.name}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Project
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-tertiary uppercase mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>
            </div>

            {/* Progress */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-tertiary uppercase mb-3">
                Progress
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">Completion</span>
                  <span className="font-semibold text-foreground">
                    {project.progress_percentage}%
                  </span>
                </div>
                <Progress value={project.progress_percentage} className="h-3" />
              </div>
            </div>

            {/* Links */}
            {(project.github_url || project.live_url) && (
              <div>
                <h3 className="text-sm font-semibold text-foreground-tertiary uppercase mb-3">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="underline">View on GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="underline">Visit Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Dates */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-tertiary uppercase mb-3">
                Timeline
              </h3>
              <div className="space-y-2 text-sm">
                {project.started_date && (
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Started</span>
                    <span className="font-medium text-foreground">
                      {formatDate(project.started_date)}
                    </span>
                  </div>
                )}
                {project.last_worked_date && (
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Last Worked On</span>
                    <span className="font-medium text-foreground">
                      {formatDate(project.last_worked_date)}
                    </span>
                  </div>
                )}
                {project.shipped_date && (
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Shipped</span>
                    <span className="font-medium text-status-shipped">
                      {formatDate(project.shipped_date)}
                    </span>
                  </div>
                )}
                {project.abandoned_date && (
                  <div className="flex justify-between">
                    <span className="text-foreground-secondary">Abandoned</span>
                    <span className="font-medium text-status-abandoned">
                      {formatDate(project.abandoned_date)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Reflections */}
        <div className="space-y-6">
          {project.why_stopped && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Why I Stopped</h3>
              <p className="text-foreground-secondary">{project.why_stopped}</p>
            </div>
          )}

          {project.what_learned && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">What I Learned</h3>
              <p className="text-foreground-secondary">{project.what_learned}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
