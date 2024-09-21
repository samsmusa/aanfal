import {Button} from "@/components/ui/button"
import ServiceCard from "@/app/dashboard/services/components/ServiceCard";

export default function Dashboard() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Services</h1>
            </div>
            <div
                className="grid grid-cols-1 md:grid-cols-4 gap-3"
                // x-chunk="dashboard-02-chunk-1"
            >
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </div>
        </main>
    )
}
