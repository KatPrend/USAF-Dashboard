CREATE FUNCTION newmil(userid, username, usermail)
{
	INSERT INTO Mil_Personel
	Values (userid, username, usermail, NULL)
}

CREATE FUNCTION newcon(userid, username, usermail)
{
	INSERT INTO Contractor_User
	Values (userid, username, usermail, NULL)
}


CREATE FUNCTION newuser(userid, username, usermail)
{
	usertype = NULL
	
	CASE PATINDEX(%.gov%, username) WHEN 0 THEN usertype = 'con'
	ELSE usertype = 'mil'

	CASE usertype WHEN mil THEN newmil(userid, username, usermail)
	ELSE newcon (userid, username, usermail)
}

CREATE FUNCTION newpassadmin(userid, newpword)
{
	UPDATE Admin
	SET password = newpword
	WHERE admin_id = userid
}

CREATE FUNCTION newpasscon(userid, newpword)
{
	UPDATE Contractor_User
	SET password = newpword
	WHERE con_user_id = userid
}

CREATE FUNCTION newpassmil(userid, newpword)
{
	UPDATE Mil_Personel
	SET password = newpword
	WHERE mili_id = userid
}