interface DateProps {
    date: Date;
}

interface WeekInterval {
    start: Date;
    end: Date;
}

const registerDate = new Date(2020, 7, 19);

getFirstDateInterval({ date: registerDate });

function getFirstDateInterval({ date }: DateProps) {
    const startDate = new Date(date);
    const initialDay = startDate.getDay();
    let daysToBack = 0;

    if (initialDay >= 5) {
        daysToBack = initialDay - 5;
    } else {
        daysToBack = initialDay + 2;
    }

    startDate.setDate(startDate.getDate() - daysToBack);

    calculateIntervals({ date: startDate });
}

function calculateIntervals({ date }: DateProps) {
    const today = new Date();
    
    let currentStart = new Date(date);
    
    let currentEnd = new Date(date);
    currentEnd.setDate(currentEnd.getDate() + 6);

    let weeks: WeekInterval[] = [];

    while (currentStart <= today) {
        
        weeks.push({
            start: new Date(currentStart),
            end: new Date(currentEnd)
        });

        currentStart.setDate(currentStart.getDate() + 7);
        currentEnd.setDate(currentEnd.getDate() + 7);
    }

    console.log(weeks.map(w => ({
        start: w.start.toLocaleDateString(),
        end: w.end.toLocaleDateString()
    })));
}