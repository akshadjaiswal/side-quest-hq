'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProjectForm } from '@/components/projects/project-form'
import { useCreateProject } from '@/hooks/use-projects'
import { ProjectFormData } from '@/lib/validations/project-schema'

interface AddProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProjectDialog({ open, onOpenChange }: AddProjectDialogProps) {
  const createProject = useCreateProject()

  const handleSubmit = async (data: ProjectFormData) => {
    await createProject.mutateAsync(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={createProject.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
