import { Card } from '@heroui/react';

export const StatCard = ({ title, value, icon: Icon, className = "" }) => {
    return (
         <Card className={`bg-[#18181b] border border-neutral-800 rounded-2xl ${className}`}
        >
            <Card.Content className="flex flex-col gap-3 justify-between">
               
                {Icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-800 text-neutral-300">
                        <Icon width={20} height={20} />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-neutral-400">
                        {title}
                    </span>
                    <span className="text-3xl font-semibold text-white tracking-tight">
                        {value}
                    </span>
                </div>

            </Card.Content>
        </Card>
    );
};