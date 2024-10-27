import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Welcome to Our Amazing Product
        </h1>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature cards */}
          <Card>
            <CardHeader>
              <CardTitle>Feature 1</CardTitle>
              <CardDescription>Description of feature 1</CardDescription>
            </CardHeader>
            <CardContent>
              <p>More details about feature 1...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature 2</CardTitle>
              <CardDescription>Description of feature 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p>More details about feature 2...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature 3</CardTitle>
              <CardDescription>Description of feature 3</CardDescription>
            </CardHeader>
            <CardContent>
              <p>More details about feature 3...</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg">Get Started</Button>
        </div>
      </main>
    </div>
  )
}
