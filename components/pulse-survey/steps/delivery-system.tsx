"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { MailIcon, BellIcon } from "lucide-react"
import { FaSlack, FaMicrosoft } from "react-icons/fa"

interface DeliverySystemProps {
  deliverySystem: string[]
  updateData: (data: { deliverySystem: string[] }) => void
}

export default function DeliverySystem({ deliverySystem, updateData }: DeliverySystemProps) {
  const [systems, setSystems] = useState<string[]>(deliverySystem || [])

  const toggleSystem = (system: string) => {
    const updatedSystems = systems.includes(system) ? systems.filter((s) => s !== system) : [...systems, system]

    setSystems(updatedSystems)
    updateData({ deliverySystem: updatedSystems })
  }

  const deliveryOptions = [
    {
      id: "slack",
      name: "Slack",
      description: "Send surveys via Slack direct messages",
      icon: <FaSlack className="h-6 w-6 text-[#4A154B]" />,
    },
    {
      id: "email",
      name: "Email",
      description: "Send surveys via email",
      icon: <MailIcon className="h-6 w-6 text-[#60A5FA]" />,
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Send surveys via Microsoft Teams",
      icon: <FaMicrosoft className="h-6 w-6 text-[#4B53BC]" />,
    },
    {
      id: "in-app",
      name: "In-App Notification",
      description: "Show surveys within the application",
      icon: <BellIcon className="h-6 w-6 text-[#F59E0B]" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[#1F2937] mb-2">Choose Delivery System</h3>
        <p className="text-sm text-gray-500 mb-4">Select how you want to deliver the survey to your team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 ${
              systems.includes(option.id) ? "border-[#60A5FA] shadow-md" : "border-gray-200"
            }`}
            onClick={() => toggleSystem(option.id)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">{option.icon}</div>
                <div>
                  <h4 className="font-medium text-[#1F2937]">{option.name}</h4>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Switch checked={systems.includes(option.id)} onCheckedChange={() => toggleSystem(option.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {systems.length === 0 && (
        <div className="text-center p-4 text-sm text-red-500">Please select at least one delivery system.</div>
      )}
    </div>
  )
}
