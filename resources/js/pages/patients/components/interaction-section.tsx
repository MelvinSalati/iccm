// Usage example — wire this into the patient page wherever interactions live.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import InteractionsTable, { Interaction } from './InteractionsTable'

interface Props {
    interactions: Interaction[];
}

export function InteractionsSection({ interactions }: Props) {
    const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);

    return (
        <div className="flex flex-col gap-2 py-2">
            <div className="flex items-center justify-between">
                <Button size="sm">Initiate Visit</Button>
            </div>

            <InteractionsTable
                interactionHistory={interactions}
                onViewInteractionHistoryModal={(interaction) => setSelectedInteraction(interaction)}
            />

            {/* selectedInteraction drives your modal component — wire it up here */}
        </div>
    );
}

export default InteractionsSection;
