import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
    index: number;
    icon: any;
    title: string;
    
    // Karena di StatCard ngirim element JSX
    value: React.ReactNode;
    bgIcon: string;
    bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
    index,
    icon,
    title,
    value,
    bgIcon,
    bgColor,
}) => (
    <View
        className={
            "w-1/3" +
            (index === 1 || index === 4
                ? " pr-1"
                : index === 2 || index === 5
                    ? " px-1"
                    : index === 3 || index === 6
                        ? " pl-1"
                        : "") + " " +
            (index <= 3 ? " mb-2" : "")
        }
    >
        <View className={` w-full rounded-xl p-3 flex flex-col justify-center items-start gap-2 ${bgColor}`}>
            <View className={` ${bgIcon} flex justify-center items-center aspect-square p-3 rounded-xl`}>
                <HugeiconsIcon strokeWidth={2} icon={icon} className='text-white' size={32} />
            </View>
            <View className='w-full'>
                <Text className='font-jakartaMedium text-base text-gray-900'>{title}</Text>
                <Text className='font-jakartaSemiBold text-sm text-gray-500'>{value}</Text>
            </View>
        </View>
    </View>
);

export default StatCard

const styles = StyleSheet.create({})