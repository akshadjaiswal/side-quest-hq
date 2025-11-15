'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectFormSchema, ProjectFormData } from '@/lib/validations/project-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SideProject } from '@/types'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProjectFormProps {
  defaultValues?: Partial<SideProject>
  onSubmit: (data: ProjectFormData) => void
  onCancel?: () => void
  isSubmitting?: boolean
}

export function ProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProjectFormProps) {
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>(defaultValues?.tech_stack || [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          description: defaultValues.description,
          status: defaultValues.status,
          tech_stack: defaultValues.tech_stack,
          started_date: defaultValues.started_date || undefined,
          last_worked_date: defaultValues.last_worked_date || undefined,
          why_stopped: defaultValues.why_stopped || undefined,
          what_learned: defaultValues.what_learned || undefined,
          github_url: defaultValues.github_url || undefined,
          live_url: defaultValues.live_url || undefined,
          progress_percentage: defaultValues.progress_percentage,
          is_public: defaultValues.is_public,
        }
      : {
          status: 'active',
          tech_stack: [],
          progress_percentage: 0,
          is_public: true,
        },
  })

  const status = watch('status')

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault()
      if (!techStack.includes(techInput.trim()) && techStack.length < 10) {
        const newTechStack = [...techStack, techInput.trim()]
        setTechStack(newTechStack)
        setValue('tech_stack', newTechStack)
        setTechInput('')
      }
    }
  }

  const handleRemoveTech = (tech: string) => {
    const newTechStack = techStack.filter((t) => t !== tech)
    setTechStack(newTechStack)
    setValue('tech_stack', newTechStack)
  }

  const onFormSubmit = (data: any) => {
    onSubmit({ ...data, tech_stack: techStack } as ProjectFormData)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Project Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Recipe App for Developers"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="A recipe manager with Markdown support..."
          rows={4}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select
          defaultValue={defaultValues?.status || 'active'}
          onValueChange={(value) => setValue('status', value as any)}
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">🟢 Active</SelectItem>
            <SelectItem value="paused">🟡 Paused</SelectItem>
            <SelectItem value="abandoned">💀 Abandoned</SelectItem>
            <SelectItem value="shipped">✅ Shipped</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label htmlFor="tech">Tech Stack *</Label>
        <Input
          id="tech"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={handleAddTech}
          placeholder="Press Enter to add (e.g., Next.js, Supabase)"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="gap-1">
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        {errors.tech_stack && (
          <p className="text-sm text-red-500">{errors.tech_stack.message}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="started_date">Started Date</Label>
          <Input id="started_date" type="date" {...register('started_date')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_worked_date">Last Worked On</Label>
          <Input id="last_worked_date" type="date" {...register('last_worked_date')} />
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Label htmlFor="progress_percentage">Progress (%)</Label>
        <Input
          id="progress_percentage"
          type="number"
          min="0"
          max="100"
          {...register('progress_percentage', { valueAsNumber: true })}
        />
        {errors.progress_percentage && (
          <p className="text-sm text-red-500">{errors.progress_percentage.message}</p>
        )}
      </div>

      {/* Optional fields for abandoned/paused projects */}
      {(status === 'abandoned' || status === 'paused') && (
        <div className="space-y-2">
          <Label htmlFor="why_stopped">Why I Stopped</Label>
          <Textarea
            id="why_stopped"
            {...register('why_stopped')}
            placeholder="Lost interest, found better alternative..."
            rows={3}
          />
        </div>
      )}

      {/* What Learned */}
      <div className="space-y-2">
        <Label htmlFor="what_learned">What I Learned</Label>
        <Textarea
          id="what_learned"
          {...register('what_learned')}
          placeholder="Learned Supabase auth patterns..."
          rows={3}
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            type="url"
            {...register('github_url')}
            placeholder="https://github.com/user/repo"
          />
          {errors.github_url && (
            <p className="text-sm text-red-500">{errors.github_url.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="live_url">Live URL</Label>
          <Input
            id="live_url"
            type="url"
            {...register('live_url')}
            placeholder="https://myproject.com"
          />
          {errors.live_url && (
            <p className="text-sm text-red-500">{errors.live_url.message}</p>
          )}
        </div>
      </div>

      {/* Privacy */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_public"
          {...register('is_public')}
          className="w-4 h-4 rounded border-border"
        />
        <Label htmlFor="is_public" className="cursor-pointer">
          Make this project visible on my public profile
        </Label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          {isSubmitting ? 'Saving...' : defaultValues ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}
