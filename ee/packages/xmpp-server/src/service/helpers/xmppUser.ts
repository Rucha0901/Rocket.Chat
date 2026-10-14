import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { domainOfJid, toBareJid } from './jid';

/**
 * Idempotently upserts a remote XMPP user as a local record keyed by their bare JID.
 *
 * `name` is the nick the user was last seen under; without one, the name already stored is kept.
 */
export async function createOrUpdateXMPPUser(options: { jid: string; name?: string }): Promise<IUser> {
	const jid = toBareJid(options.jid);

	const user = await Users.upsertXMPPUser(jid, domainOfJid(jid), options.name);

	if (!user) {
		throw new Error(`Failed to create or update XMPP user: ${jid}`);
	}

	return user;
}
