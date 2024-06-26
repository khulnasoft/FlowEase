import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from '@flowease/typeorm';
import type { InstalledNodes } from './InstalledNodes';
import { WithTimestamps } from './AbstractEntity';

@Entity()
export class InstalledPackages extends WithTimestamps {
	@PrimaryColumn()
	packageName: string;

	@Column()
	installedVersion: string;

	@Column()
	authorName?: string;

	@Column()
	authorEmail?: string;

	@OneToMany('InstalledNodes', 'package')
	@JoinColumn({ referencedColumnName: 'package' })
	installedNodes: InstalledNodes[];
}
