"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Trash2Icon, PencilIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

interface AddTeamMembersProps {
  teamMembers: TeamMember[]
  updateData: (data: { teamMembers: TeamMember[] }) => void
}

export default function AddTeamMembers({ teamMembers, updateData }: AddTeamMembersProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; role?: string } = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(email)) newErrors.email = "Invalid email format"
    if (!role.trim()) newErrors.role = "Role is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddMember = () => {
    if (!validateForm()) return

    const newMember = {
      id: editingId || Date.now().toString(),
      name,
      email,
      role,
    }

    if (editingId) {
      updateData({
        teamMembers: teamMembers.map((member) => (member.id === editingId ? newMember : member)),
      })
      setEditingId(null)
    } else {
      updateData({ teamMembers: [...teamMembers, newMember] })
    }

    // Reset form
    setName("")
    setEmail("")
    setRole("")
    setErrors({})
  }

  const handleEdit = (member: TeamMember) => {
    setName(member.name)
    setEmail(member.email)
    setRole(member.role)
    setEditingId(member.id)
  }

  const handleDelete = (id: string) => {
    updateData({
      teamMembers: teamMembers.filter((member) => member.id !== id),
    })
  }

  const handleCancel = () => {
    setName("")
    setEmail("")
    setRole("")
    setEditingId(null)
    setErrors({})
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[#1F2937] mb-2">Add Team Members</h3>
        <p className="text-sm text-gray-500 mb-4">Add team members who will receive the pulse survey.</p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Team Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Developer" />
              {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white" onClick={handleAddMember}>
                {editingId ? "Update" : "Add"}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {teamMembers.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                            <PencilIcon className="h-4 w-4 text-gray-500" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500">No team members added yet.</p>
        </div>
      )}
    </div>
  )
}
