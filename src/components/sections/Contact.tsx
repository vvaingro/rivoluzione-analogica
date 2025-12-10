import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function Contact() {
  return (
    <section className="bg-white dark:bg-black px-4 py-32 text-center" id="contact">
      <div className="container mx-auto">
        <h2 className="mb-8 text-[40px] font-normal" style={{ fontFamily: '"Times New Roman", serif' }}>
          Get In Touch
        </h2>
        <Button asChild size="lg" className="h-16 rounded-full px-8 text-base border border-black/10 dark:border-white/10">
          <a href="mailto:contact@example.com">
            <Mail className="mr-2 h-5 w-5" />
            Say Hello
          </a>
        </Button>
      </div>
    </section>
  )
}
